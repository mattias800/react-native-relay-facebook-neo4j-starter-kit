export type AnimalKindType = "cat" | "dog";

export class Animal {

    id: string;
    createdAt: Date;
    fullName: ?string;
    nickName: ?string;
    animalKind: "dog" | "cat";
    profilePhotoUrl: ?string;
    birthDate: ?Date;
    deathDate: ?Date;
    litterId: ?string;
    deceased: ?boolean;

    constructor(id: string,
                createdAt: Date,
                fullName: ?string,
                nickName: ?string,
                animalKind: AnimalKindType = "dog",
                profilePhotoUrl: ?string,
                birthDate: ?Date,
                deathDate: ?Date,
                litterId: ?string,
                deceased: ?boolean) {
        this.id = id;
        this.createdAt = createdAt;
        this.fullName = fullName;
        this.nickName = nickName;
        this.animalKind = animalKind;
        this.profilePhotoUrl = profilePhotoUrl;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.litterId = litterId;
        this.deceased = deceased;
    }

    static createFromEntity(entity: ?Object): Animal {
        if (!entity) {
            throw "Animal.createFromEntity() got undefined entity as argument.";
        }
        return new Animal(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            new Date(entity.properties.modifiedAt),
            Boolean(entity.properties.deleted),
            new Date(entity.properties.deletedAt),

            entity.properties.fullName,
            entity.properties.nickName,
            entity.properties.animalKind,
            entity.properties.profilePhotoUrl,
            entity.properties.birthDate,
            entity.properties.deathDate,
            entity.properties.litterId,
            Boolean(entity.properties.deceased)
        );
    }

}

export const mockedAnimal = new Animal("id123", new Date(), "Soya Upswing", "Soya", "dog", "", new Date(), new Date(), "litterId123", false);