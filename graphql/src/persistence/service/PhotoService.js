/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {Observable} from "rx";
import {getConnectionCustomMatchQuery, getConnectionMatchQuery} from "../util/QueryGenerator";
import {Animal} from "../../entities/Animal";
import {Photo} from "../../entities/Photo";
import {getQueryProps, prepareQueryModel} from "../util/GraphQlHelper";


export async function getPhotoById(id: string): Promise<Photo> {
    return await cypher(
        "MATCH (photo:Photo {id: {id}}) return photo", {id})
        .then(results => results.map(result => result.photo))
        .then(photos => photos.length > 0 ? photos[0] : undefined)
        .then(photo => photo && Photo.createFromEntity(photo));
}


export async function getAllPhotos(): Promise<Array<User>> {
    return Observable.fromPromise(cypher("MATCH (photo:Photo) return photo"))
        .flatMap(Observable.from)
        .map(result => result.photo)
        .map(Photo.createFromEntity)
        .toArray()
        .toPromise()
}

export async function getAllPhotosConnection(connectionArguments: Object,
                                             orderByProperty: "id"|"createdAt" = "createdAt"): Promise<Array<Photo>> {
    const {first, last, before, after} = connectionArguments;

    return Observable
        .fromPromise(cypher(getConnectionMatchQuery("Photo", "photo", orderByProperty, connectionArguments)))
        .flatMap(Observable.from)
        .map(result => result.photo)
        .map(Photo.createFromEntity)
        .toArray()
        .toPromise();
}

export async function getAnimalsTaggedInPhotoConnection(photo: Photo,
                                                        connectionArguments: Object,
                                                        orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<Animal>> {
    const {id} = photo;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (animal:Animal)-[:IS_TAGGED_IN]->(u:Photo {id:{id}})",
                    "animal",
                    "animal",
                    orderByProperty,
                    connectionArguments
                ),
                {id}
            ))
        .flatMap(Observable.from)
        .map(result => result.animal)
        .map(Animal.createFromEntity)
        .toArray()
        .toPromise();
}

export async function getUsersTaggedInPhotoConnection(photo: Photo,
                                                      connectionArguments: Object,
                                                      orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<User>> {
    const {id} = photo;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (user:User)-[:IS_TAGGED_IN]->(u:Photo {id:{id}})",
                    "user",
                    "user",
                    orderByProperty,
                    connectionArguments
                ),
                {id}
            ))
        .flatMap(Observable.from)
        .map(result => result.user)
        .map(User.createFromEntity)
        .toArray()
        .toPromise();
}

export async function getPhotosThatUserIsTaggedInConnection(user: User,
                                                            connectionArguments: Object,
                                                            orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<Photo>> {
    const {id} = user;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (user:User {id:{id}})-[:IS_TAGGED_IN]->(photo:Photo)",
                    "photo",
                    "photo",
                    orderByProperty,
                    connectionArguments
                ),
                {id}
            ))
        .flatMap(Observable.from)
        .map(result => result.photo)
        .map(Photo.createFromEntity)
        .toArray()
        .toPromise();
}

export async function getPhotosThatAnimalIsTaggedInConnection(animal: Animal,
                                                              connectionArguments: Object,
                                                              orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<Photo>> {
    const {id} = animal;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (animal:Animal {id:{id}})-[:IS_TAGGED_IN]->(photo:Photo)",
                    "photo",
                    "photo",
                    orderByProperty,
                    connectionArguments
                ),
                {id}
            ))
        .flatMap(Observable.from)
        .map(result => result.photo)
        .map(Photo.createFromEntity)
        .toArray()
        .toPromise();
}

export async function insertPhoto(photo: Photo, owner: User): Promise<Photo> {
    return await cypher(
        `
        MATCH (user:User {id:{ownerId}})
        CREATE (photo:Photo {${getQueryProps(photo)}})
        CREATE (photo)-[:TAKEN_BY]->(user)
        RETURN photo
        `,
        {
            ...(prepareQueryModel(photo)),
            ownerId: owner.id
        })
        .then(results => results.map(result => result.photo))
        .then(photos => photos.length > 0 ? photos[0] : undefined)
        .then(photo => photo && Photo.createFromEntity(photo));

}

export async function getNumPhotosThatUserIsTaggedIn(user: User): Promise<number> {
    const {id} = user;
    return Observable
        .fromPromise(cypher("MATCH (user:User {id:{id}})-[:IS_TAGGED_IN]->(photo:Photo) return count(photo);", {id}))
        .map(result => result[0]["count(photo)"])
        .toPromise();
}

export async function getNumPhotosThatAnimalIsTaggedIn(animal: Animal): Promise<number> {
    const {id} = animal;
    return Observable
        .fromPromise(cypher("MATCH (animal:Animal {id:{id}})-[:IS_TAGGED_IN]->(photo:Photo) return count(photo);",
                            {id}))
        .map(result => result[0]["count(photo)"])
        .toPromise();
}

