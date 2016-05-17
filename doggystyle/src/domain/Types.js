// @flow

type AuthenticatedDevice = {
    deviceId : string;
    authToken : string;
};

type AuthenticationServiceType = "facebook";

type authenticatedService = {
    type : AuthenticationServiceType,
    userId : string,
    authToken : string
};

type User = {
    id : string,
    firstName : string;
    lastName : string;
    email : string;
    authenticatedDevices : Array<AuthenticatedDevice>;
}

type AnimalType = "dog" | "cat";
type EntityType = "animal" | "user" | "litter";

type EntityReference = {
    entityType : EntityType,
    id : string
};

type Animal = {
    id : string,
    type : AnimalType,
    fullName : string,
    nickName : string,
    birthDate : Date
};

type Litter = {
    id : string,
    dogs : Array<Dog>,
    birthStart : Date,
    birthEnd : Date
};

type Photo = {
    id : string,
    url : string
};

type UserPhoto = {
    userId : string,
    photoId : string
};

type AnimalPhoto = {
    animalId : string,
    photoId : string
};

type LitterPhoto = {
    litterId : string,
    photoId : string
};
