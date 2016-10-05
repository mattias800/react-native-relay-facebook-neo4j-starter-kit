/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {Observable} from "rx";
import {getConnectionCustomMatchQuery, getConnectionMatchQuery} from "../util/QueryGenerator";
import {Animal} from "../../entities/Animal";
import {getQueryProps} from "../util/GraphQlHelper";

export async function getAnimalById(id: string): Promise<Animal> {
    return await cypher(
        "MATCH (animal:Animal {id: {id}}) return animal", {id})
        .then(results => results.map(result => result.animal))
        .then(animals => animals.length > 0 ? animals[0] : undefined)
        .then(animal => animal && Animal.createFromEntity(animal));
}


export async function getAllAnimals(): Promise<Array<User>> {
    return Observable.fromPromise(cypher("MATCH (animal:Animal) return animal"))
        .flatMap(Observable.from)
        .map(result => result.animal)
        .map(User.createFromEntity)
        .toArray()
        .toPromise()
}

export async function getAllUsersConnection(connectionArguments: Object,
                                            orderByProperty: "id"|"createdAt" = "createdAt"): Promise<Array<User>> {
    const {first, last, before, after} = connectionArguments;

    return Observable
        .fromPromise(cypher(getConnectionMatchQuery("User", "user", orderByProperty, connectionArguments)))
        .flatMap(Observable.from)
        .map(result => result.user)
        .map(Animal.createFromEntity)
        .toArray()
        .toPromise();
}

export async function getAnimalsOwnedByUserConnection(user: User,
                                                      connectionArguments: Object,
                                                      orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<User>> {
    const {id} = user;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (u:User {id:{id}})-[:OWNS]->(animal:Animal)",
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

export async function insertAnimal(animal: Animal, owner: User) {
    return await cypher(
        `
        MATCH (user:User {id:{id}})
        CREATE (animal:Animal {${getQueryProps(animal)})
        CREATE (user)-[:OWNS]->(animal)
        RETURN animal
        `,
        {
            ...animal,
            ownerId: owner.id
        })
        .then(results => results.map(result => result.animal))
        .then(animals => animals.length > 0 ? animals[0] : undefined)
        .then(animal => animal && Animal.createFromEntity(animal));

}

export async function getNumAnimalsFor(user: User): Promise<number> {
    const {id} = user;
    return Observable
        .fromPromise(cypher("MATCH (user:User {id:{id}})-[:OWNS]->(animal:Animal) return count(animal);", {id}))
        .map(result => result[0]["count(animal)"])
        .toPromise();
}

export async function getNumOwnersForAnimal(animal: Animal): Promise<number> {
    const {id} = animal;
    return Observable
        .fromPromise(cypher("MATCH (user:User)-[:OWNS]->(animal:Animal {id:{id}}) return count(user);", {id}))
        .map(result => result[0]["count(user)"])
        .toPromise();
}

export async function getOwnersOfAnimalConnection(animal: Animal,
                                                  connectionArguments: Object,
                                                  orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<User>> {
    const {id} = animal;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (user:User)-[:IS_FRIENDS_WITH]->(animal:Animal {id:{id}})",
                    "user",
                    "user",
                    orderByProperty,
                    connectionArguments
                ),
                {id}
            ))
        .flatMap(Observable.from)
        .map(result => result.friend)
        .map(User.createFromEntity)
        .toArray()
        .toPromise();
}
