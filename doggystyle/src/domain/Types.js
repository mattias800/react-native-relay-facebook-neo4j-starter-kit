// @flow

export type AnimalType = "dog" | "cat";
export type EntityType = "animal" | "user" | "litter" | "kennel";
export type EntityId = string;
export type UserId = EntityId;
export type PhotoId = EntityId;
export type AnimalId = EntityId;
export type LitterId = EntityId;
export type KennelId = EntityId;

export type AuthenticatedDevice = {
    deviceId : string;
    authToken : string;
};

export type AuthenticationServiceType = "facebook" | "twitter";

export type authenticatedService = {
    type : AuthenticationServiceType,
    userId : string,
    authToken : string
};

export type User = {
    id : UserId,
    firstName : string,
    lastName : string,
    email : string,
    authenticatedDevices : Array<AuthenticatedDevice>,
    profilePhoto : ?PhotoId,
    backgroundPhoto : ?PhotoId
};


export type EntityReference = {
    entityType : EntityType,
    id : EntityId
};

export type Animal = {
    id : AnimalId,
    type : AnimalType,
    owner : UserId,
    profilePhoto : ?PhotoId,
    litter : ?LitterId,
    fullName : ?string,
    nickName : string,
    birthDate : ?Date
};

export type Kennel = {
    id : KennelId,
    owner : UserId,
    name : string,
    profilePhoto : ?PhotoId,
    location : ?GeoLocation
};

export type Litter = {
    id : LitterId,
    owner : UserId,
    kennel : ?KennelId,
    father : ?AnimalId,
    mother : ?AnimalId,
    profilePhoto : ?PhotoId,
    conceptionDate : ?Date,
    expectedBirthDate : ?Date,
    birthStart : ?Date,
    birthEnd : ?Date
};

export type Photo = {
    id : PhotoId,
    url : string,
    owner : UserId
};

export type PhotoReference = {
    photo : PhotoId,
    ref : EntityReference
};

export type GeoLocation = {
    long : number,
    lat : number
};
