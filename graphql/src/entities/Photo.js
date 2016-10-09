import {Entity} from "./Entity";

export class Photo extends Entity {

    url: string;

    constructor(id: ?string,
                createdAt: Date,
                modifiedAt: Date,
                deleted: boolean,
                deletedAt: Date,
                url: ?string) {
        super(id, createdAt, modifiedAt, deleted, deletedAt);
        this.url = url;
    }

    static createFromEntity(entity: ?Object): Photo {
        if (!entity) {
            throw "Photo.createFromEntity() got undefined entity as argument.";
        }
        return new Photo(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            new Date(entity.properties.modifiedAt),
            Boolean(entity.properties.deleted),
            new Date(entity.properties.deletedAt),

            entity.properties.url
        );
    }


}