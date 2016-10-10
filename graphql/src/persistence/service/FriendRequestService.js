/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {Observable} from "rx";
import {FriendRequest} from "../../entities/FriendRequest";
import {getQueryProps} from "../util/GraphQlHelper";

const ACTIVE_FRIEND_REQUEST_PROPERTIES = "accepted:false, ignored:false, declined:false";

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

export async function acceptFriendRequest(viewer: User, friendRequest: FriendRequest) {

}

export async function declineFriendRequest(viewer: User, friendRequest: FriendRequest) {

}

export async function ignoreFriendRequest(viewer: User, friendRequest: FriendRequest) {

}

export async function createFriendRequest(from: User, to: User): Promise<Array<FriendRequest>> {
    const createdAt = new Date();
    const props = {
        accepted: false,
        ignored: false,
        declined: false,
        createdAt
    };

    return Observable
        .fromPromise(cypher(
            `MATCH (from:User {id:{fromId}})
             MATCH (to:User {id:{toId}})
             CREATE (from)-[:WANTS_TO_BE_FRIENDS_WITH {${getQueryProps(props)}}]->(to)
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

