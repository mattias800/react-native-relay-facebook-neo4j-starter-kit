import {Entity} from "./Entity";
import {User} from "./User";

export class FriendRequest extends Entity {

    sender: User;
    receiver: User;
    accepted: boolean;
    ignored: boolean;
    declined: boolean;

    constructor(id: string,
                createdAt: Date,
                modifiedAt: Date,
                deleted: boolean,
                deletedAt: Date,
                sender: User,
                receiver: User,
                accepted: boolean,
                ignored: boolean,
                declined: boolean) {
        super(id, createdAt, modifiedAt, deleted, deletedAt);
        this.sender = sender;
        this.receiver = receiver;
        this.accepted = accepted;
        this.ignored = ignored;
        this.declined = declined;
    }

    static createFromEntity(entity: ?Object, sender: User, receiver: User): FriendRequest {
        if (!entity) {
            throw "FriendRequest.createFromEntity() got undefined entity as argument.";
        }
        return new FriendRequest(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            new Date(entity.properties.modifiedAt),
            Boolean(entity.properties.deleted),
            new Date(entity.properties.deletedAt),

            sender,
            receiver,
            entity.properties.accepted,
            entity.properties.ignored,
            entity.properties.declined
        );
    }

}