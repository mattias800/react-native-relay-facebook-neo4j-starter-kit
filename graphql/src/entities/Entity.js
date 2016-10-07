export class Entity {

    id: string;
    createdAt: Date;
    modifiedAt: Date;
    deleted: boolean;
    deletedAt: Date;

    constructor(id: string,
                createdAt: Date = new Date(),
                modifiedAt: Date = new Date(),
                deleted: boolean = false,
                deletedAt: ?Date = undefined) {
        this.id = id;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.deleted = deleted;
        this.deletedAt = deletedAt;
    }

}