import {Entity} from "./Entity";
import {User} from "./User";

export class FriendRequest extends Entity {

    from: User;
    to: User;
    accepted: boolean;
    ignored: boolean;
    declined: boolean;

    constructor(id: string,
                createdAt: Date,
                modifiedAt: Date,
                deleted: boolean,
                deletedAt: Date,
                from: User,
                to: User,
                accepted: boolean,
                ignored: boolean,
                declined: boolean) {
        super(id, createdAt, modifiedAt, deleted, deletedAt);
        this.from = from;
        this.to = to;
        this.accepted = accepted;
        this.ignored = ignored;
        this.declined = declined;
    }

    static createFromEntity(entity: ?Object, from: User, to: User): FriendRequest {
        if (!entity) {
            throw "FriendRequest.createFromEntity() got undefined entity as argument.";
        }
        return new FriendRequest(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            new Date(entity.properties.modifiedAt),
            Boolean(entity.properties.deleted),
            new Date(entity.properties.deletedAt),

            from,
            to,
            entity.properties.accepted,
            entity.properties.ignored,
            entity.properties.declined
        );
    }

}