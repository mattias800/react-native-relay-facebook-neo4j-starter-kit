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

    constructor(id: string,
                createdAt: Date,
                fullName: ?string,
                nickName: ?string,
                animalKind: AnimalKindType = "dog",
                profilePhotoUrl: ?string,
                birthDate: ?Date,
                deathDate: ?Date,
                litterId: ?string) {
        this.id = id;
        this.createdAt = createdAt;
        this.fullName = fullName;
        this.nickName = nickName;
        this.animalKind = animalKind;
        this.profilePhotoUrl = profilePhotoUrl;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.litterId = litterId;
    }

    static createFromEntity(entity: ?Object): Animal {
        if (!entity) {
            throw "Animal.createFromEntity() got undefined entity as argument.";
        }
        return new Animal(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            entity.properties.fullName,
            entity.properties.nickName,
            entity.properties.animalKind,
            entity.properties.profilePhotoUrl,
            entity.properties.birthDate,
            entity.properties.deathDate,
            entity.properties.litterId
        );
    }

}

export const mockedAnimal = new Animal("id123", new Date(), "Soya Upswing", "Soya", "dog", "", new Date(), new Date(), "litterId123");