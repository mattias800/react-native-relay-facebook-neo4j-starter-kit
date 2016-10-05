export class Litter {

    id: string;
    createdAt: Date;
    fatherAnimalId: string;
    motherAnimalId: string;
    profilePhotoUrl: string;
    conceptionDate: Date;
    expectedBirthDate: Date;
    birthDate: Date;


    constructor(id: string,
                createdAt: Date,
                fatherAnimalId: string,
                motherAnimalId: string,
                profilePhotoUrl: string,
                conceptionDate: Date,
                expectedBirthDate: Date,
                birthDate: Date) {
        this.id = id;
        this.createdAt = createdAt;
        this.fatherAnimalId = fatherAnimalId;
        this.motherAnimalId = motherAnimalId;
        this.profilePhotoUrl = profilePhotoUrl;
        this.conceptionDate = conceptionDate;
        this.expectedBirthDate = expectedBirthDate;
        this.birthDate = birthDate;
    }
}