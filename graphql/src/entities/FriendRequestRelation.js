import {FriendRequest} from "./FriendRequest";

export class FriendRequestRelation {

    received: ?FriendRequest;
    sent: ?FriendRequest;


    constructor(sent: ?FriendRequest, received: ?FriendRequest) {
        this.sent = sent;
        this.received = received;
    }

}