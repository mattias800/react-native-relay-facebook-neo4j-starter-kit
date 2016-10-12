/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {Observable} from "rx";
import {FriendRequest} from "../../entities/FriendRequest";
import {getQueryProps} from "../util/GraphQlHelper";
import {FriendRequestRelation} from "../../entities/FriendRequestRelation";

const ACTIVE_FRIEND_REQUEST_PROPERTIES = "accepted:false, ignored:false, declined:false";

export async function getFriendRequestByUsers(from: User, to: User): Promise<FriendRequest> {
    if (from.id === to.id) {
        return Promise.resolve(null);
    }
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User {id:{fromId}})
             MATCH (to:User {id:{toId}})
             MATCH (from)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {${ACTIVE_FRIEND_REQUEST_PROPERTIES}}]->(to)
             RETURN from, to, friendRequest`,
            {
                fromId: from.id,
                toId: to.id
            }))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.from),
                                                      User.createFromEntity(result.to)))
        .toPromise();
}

export async function getFriendRequestRelationByUsers(from: User, to: User): Promise<FriendRequestRelation> {
    if (from.id === to.id) {
        return Promise.resolve(new FriendRequestRelation(null, null));
    }
    const outgoing = await getFriendRequestByUsers(from, to);
    const incoming = await getFriendRequestByUsers(to, from);
    return new FriendRequestRelation(outgoing, incoming);
}

export async function getFriendRequestById(id: string): Promise<FriendRequest> {
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {id:{id} ${ACTIVE_FRIEND_REQUEST_PROPERTIES}}]->(to:User)
             RETURN from, to, friendRequest`,
            {id}))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.from),
                                                      User.createFromEntity(result.to)))
        .toArray()
        .toPromise();
}

export async function getActiveIncomingFriendRequests(user: User): Promise<Array<FriendRequest>> {
    const {id} = user;
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {${ACTIVE_FRIEND_REQUEST_PROPERTIES}}]->(to:User {id:{id}})
             RETURN from, to, friendRequest`,
            {id}))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.from),
                                                      User.createFromEntity(result.to)))
        .toArray()
        .toPromise();
}

export async function getActiveOutgoingFriendRequests(user: User,
                                                      connectionArguments: Object,
                                                      orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<FriendRequest>> {
    const {id} = user;
    return Observable
        .fromPromise(cypher(
            `MATCH (u:User {id:{id}})-[:WANTS_TO_BE_FRIENDS_WITH {${ACTIVE_FRIEND_REQUEST_PROPERTIES}]->(user:User)
             RETURN from, to, friendRequest`,
            {id}))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.from),
                                                      User.createFromEntity(result.to)))
        .toArray()
        .toPromise();
}

export async function acceptFriendRequestById(actor: User, friendRequestId: string) {
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {id:{friendRequestId}}]->(to:User)
             SET friendRequest.accepted = true
             SET friendRequest.modified = {since}
             CREATE (from)-[:IS_FRIENDS_WITH {since: {since}]->(to)
             CREATE (to)-[:IS_FRIENDS_WITH {since: {since}]->(user)
             RETURN from, to`,
            {
                friendRequestId,
                since: new Date()
            }))
        .flatMap(Observable.from)
        .map(result => User.createFromEntity(result.from))
        .toArray()
        .toPromise();
}

export async function acceptFriendRequest(from: User, to: User) {
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User {id:{fromId}})-[friendRequest:WANTS_TO_BE_FRIENDS_WITH}]->(to:User {id:{toId}})
             SET friendRequest.accepted = true
             SET friendRequest.modified = {since}
             CREATE (from)-[:IS_FRIENDS_WITH {since: {since}]->(to)
             CREATE (to)-[:IS_FRIENDS_WITH {since: {since}]->(from)
             RETURN from, to`,
            {
                fromId: from.id,
                toId: to.id,
                since: new Date()
            }))
        .flatMap(Observable.from)
        .map(result => User.createFromEntity(result.from))
        .toArray()
        .toPromise();
}

export async function declineFriendRequestById(actor: User, friendRequestId: string) {
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {id:{friendRequestId}}]->(to:User)
             SET friendRequest.declined = true
             SET friendRequest.modified = {since}
             RETURN from, to`,
            {
                friendRequestId,
                since: new Date()
            }))
        .flatMap(Observable.from)
        .map(result => User.createFromEntity(result.from))
        .toArray()
        .toPromise();

}

export async function ignoreFriendRequestById(actor: User, friendRequestId: string) {
    return Observable
        .fromPromise(cypher(
            `MATCH (from:User)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {id:{friendRequestId}}]->(to:User)
             SET friendRequest.ignored = true
             SET friendRequest.modified = {since}
             RETURN from, to`,
            {
                friendRequestId,
                since: new Date()
            }))
        .flatMap(Observable.from)
        .map(result => User.createFromEntity(result.from))
        .toArray()
        .toPromise();
}

export async function createFriendRequest(from: User, to: User): Promise<Array<FriendRequest>> {
    const createdAt = new Date();
    const props = {
        accepted: false,
        ignored: false,
        declined: false,
        responded: false,
        createdAt
    };

    return Observable
        .fromPromise(cypher(
            `MATCH (from:User {id:{fromId}})
             MATCH (to:User {id:{toId}})
             CREATE (from)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {${getQueryProps(props)}}]->(to)
             RETURN from, to, friendRequest`,
            {
                fromId: from.id,
                toId: to.id,
                ...props
            }))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest, from, to))
        .toArray()
        .toPromise();
}

