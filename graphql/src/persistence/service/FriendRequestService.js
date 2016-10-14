/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {Observable} from "rx";
import {FriendRequest} from "../../entities/FriendRequest";
import * as UserService from "./UserService";
import {getQueryProps} from "../util/GraphQlHelper";
import {FriendRequestRelation} from "../../entities/FriendRequestRelation";
import {generateUuid} from "../../util/service/UuidService";

const ACTIVE_FRIEND_REQUEST_PROPERTIES = "accepted:false, ignored:false, declined:false";

export async function getFriendRequestAwaitingReplyElseThrow(sender: User, receiver: User): Promise<FriendRequest> {
    const fr: ?FriendRequest = await getFriendRequestAwaitingReply(sender, receiver);
    if (!fr) {
        throw "No friend request awaiting reply available.";
    }
    return fr;
}
export async function getFriendRequestAwaitingReply(sender: User, receiver: User): Promise<FriendRequest> {
    if (sender.id === receiver.id) {
        return Promise.resolve(null);
    }
    return Observable
        .fromPromise(cypher(
            `MATCH (sender:User {id:{senderId}})
             MATCH (receiver:User {id:{receiverId}})
             MATCH (sender)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {${ACTIVE_FRIEND_REQUEST_PROPERTIES}}]->(receiver)
             RETURN sender, receiver, friendRequest`,
            {
                senderId: sender.id,
                receiverId: receiver.id
            }))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.sender),
                                                      User.createFromEntity(result.receiver)))
        .toPromise();
}

export async function getFriendRequestElseThrow(sender: User, receiver: User): Promise<FriendRequest> {
    const r: ?FriendRequest = await getFriendRequest(sender, receiver);
    if (!r) {
        throw "No friend request available.";
    }
    return r;
}
export async function getFriendRequest(sender: User, receiver: User): Promise<FriendRequest> {
    if (sender.id === receiver.id) {
        return Promise.resolve(null);
    }
    return Observable
        .fromPromise(cypher(
            `MATCH (sender:User {id:{senderId}})
             MATCH (receiver:User {id:{receiverId}})
             MATCH (sender)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH]->(receiver)
             RETURN sender, receiver, friendRequest`,
            {
                senderId: sender.id,
                receiverId: receiver.id
            }))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.sender),
                                                      User.createFromEntity(result.receiver)))
        .toPromise();
}

export async function getFriendRequestRelationAwaitingReply(sender: User,
                                                            receiver: User): Promise<FriendRequestRelation> {
    if (sender.id === receiver.id) {
        return Promise.resolve(new FriendRequestRelation(null, null));
    }
    const outgoing = await getFriendRequestAwaitingReply(sender, receiver);
    const incoming = await getFriendRequestAwaitingReply(receiver, sender);
    return new FriendRequestRelation(outgoing, incoming);
}

export async function getFriendRequestRelation(sender: User,
                                               receiver: User): Promise<FriendRequestRelation> {
    if (sender.id === receiver.id) {
        return Promise.resolve(new FriendRequestRelation(null, null));
    }
    const outgoing = await getFriendRequest(sender, receiver);
    const incoming = await getFriendRequest(receiver, sender);
    return new FriendRequestRelation(outgoing, incoming);
}

export async function getFriendRequestById(id: string): Promise<FriendRequest> {
    console.log("getFriendRequestById");
    console.log(id);

    return Observable
        .fromPromise(cypher(
            `MATCH (from:User)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {id:{id}}]->(to:User)
             RETURN from, to, friendRequest`,
            {id}))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest,
                                                      User.createFromEntity(result.from),
                                                      User.createFromEntity(result.to)))
        .toPromise();
}

export async function getIncomingFriendRequestsAwaitingReply(user: User): Promise<Array<FriendRequest>> {
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

export async function getOutgoingFriendRequestsAwaitingReply(user: User,
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

export async function acceptFriendRequest(sender: User, receiver: User): Promise {

    await verifyFriendRequestCanBeRespondedTo(sender, receiver);

    return cypher(
        `MATCH (from:User {id:{senderId}})-[friendRequest:WANTS_TO_BE_FRIENDS_WITH]->(to:User {id:{receiverId}})
             SET friendRequest.accepted = true
             SET friendRequest.modified = {since}
             SET friendRequest.acceptedAt = {since}
             CREATE (from)-[:IS_FRIENDS_WITH {since: {since}}]->(to)`,
        {
            senderId: sender.id,
            receiverId: receiver.id,
            since: new Date()
        });

}

export async function ignoreFriendRequest(sender: User, receiver: User): Promise {

    await verifyFriendRequestCanBeRespondedTo(sender, receiver);

    return cypher(
        `MATCH (:User {id:{senderId}})-[friendRequest:WANTS_TO_BE_FRIENDS_WITH]->(:User {id:{receiverId}})
             SET friendRequest.ignored = true
             SET friendRequest.modified = {since}
             SET friendRequest.ignoredAt = {since}`,
        {
            senderId: sender.id,
            receiverId: receiver.id,
            since: new Date()
        });

}

export async function createFriendRequest(sender: User, receiver: User): Promise<FriendRequest> {

    await verifyFriendRequestCanBeCreated(sender, receiver);

    const createdAt = new Date();
    const props = {
        id: generateUuid(),
        accepted: false,
        ignored: false,
        declined: false,
        createdAt
    };

    return Observable
        .fromPromise(cypher(
            `MATCH (from:User {id:{senderId}})
             MATCH (to:User {id:{receiverId}})
             CREATE (from)-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {${getQueryProps(props)}}]->(to)
             RETURN from, to, friendRequest`,
            {
                senderId: sender.id,
                receiverId: receiver.id,
                ...props
            }))
        .flatMap(Observable.from)
        .map(result => FriendRequest.createFromEntity(result.friendRequest, sender, receiver))
        .toPromise();
}

export async function cancelFriendRequestAwaitingReply(sender: User, receiver: User): Promise {

    await getFriendRequestAwaitingReplyElseThrow(sender, receiver);

    return cypher(
        `MATCH (from:User {id:{senderId}})-[friendRequest:WANTS_TO_BE_FRIENDS_WITH {${ACTIVE_FRIEND_REQUEST_PROPERTIES}}]->(to:User {id:{receiverId}})
         DELETE friendRequest`,
        {senderId: sender.id, receiverId: receiver.id});
}

export async function deleteFriendRequest(sender: User, receiver: User): Promise {

    await getFriendRequestElseThrow(sender, receiver);

    return cypher(
        `MATCH (from:User {id:{senderId}})-[friendRequest:WANTS_TO_BE_FRIENDS_WITH]->(to:User {id:{receiverId}})
         DELETE friendRequest`,
        {senderId: sender.id, receiverId: receiver.id});
}

export async function unfriendUser(actor: User, user: User): Promise {

    const isFriends = await UserService.isFriends(actor, user);
    if (!isFriends) {
        throw "Users are not friends.";
    }

    return cypher(
        `MATCH (:User {id:{actorId}})-[friendRelation:IS_FRIENDS_WITH]->(:User {id:{userId}})
         MATCH (:User {id:{userId}})-[friendRelation2:IS_FRIENDS_WITH]->(:User {id:{actorId}})
         DELETE friendRelation, friendRelation2`,
        {actorId: actor.id, userId: user.id});
}

export async function verifyFriendRequestCanBeCreated(sender: User, receiver: User): Promise {

    const isFriends: boolean = await UserService.isFriends(sender, receiver);
    if (isFriends) {
        throw "Users are already friends.";
    }

    const relation: FriendRequestRelation = await getFriendRequestRelation(sender, receiver);
    const {received, sent} = relation;
    if (received || sent) {
        throw "A friend request already exists between these users.";
    }
}

export async function verifyFriendRequestCanBeRespondedTo(sender: User, receiver: User): Promise {

    const isFriends: boolean = await UserService.isFriends(sender, receiver);
    if (isFriends) {
        await deleteFriendRequest(sender, receiver);
        throw "Users are already friends.";
    }

    const friendRequest: ?FriendRequest = await getFriendRequest(sender, receiver);
    if (!friendRequest) {
        throw "There is no friend request to respond to.";
    }

}

