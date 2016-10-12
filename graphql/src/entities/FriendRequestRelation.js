import {FriendRequest} from "./FriendRequest";

export class FriendRequestRelation {

    incoming: ?FriendRequest;
    outgoing: ?FriendRequest;


    constructor(outgoing: ?FriendRequest, incoming: ?FriendRequest) {
        this.outgoing = outgoing;
        this.incoming = incoming;
    }

}