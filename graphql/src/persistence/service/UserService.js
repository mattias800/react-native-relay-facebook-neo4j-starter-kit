import {cypher, matchById} from "../neo4j/Neo4jConnector";
import {generateToken} from "../../util/service/JwtService";
import {generateUuid} from "../../util/service/UuidService";
import {User} from "../../models/User";

export const getAllUsers = () => {
    return cypher(
        "MATCH (user:User) return user")
        .then(results => results.map(result => result.user))
        .then(users => users.map(user => User.createFromEntity(user)));

};

export const getUserByAuthenticationService = (service: string, token: string) => {
    return cypher(
        "MATCH (user:User)-[:LOGGED_IN_USING]->(auth:Authentication {service: {service}, token: {token}}) return user",
        {
            token,
            service
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export const getUserByEmail = (email: string) => {
    return cypher(
        "MATCH (user:User {email: {email}}) return user",
        {
            email
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export const getUserByUuid = (uuid: string) => {
    return cypher(
        "MATCH (user:User {uuid: {uuid}}) return user", {uuid})
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export const getUserByAuthToken = (token: string) => {
    return cypher(
        "MATCH (user:User {token: {token}}) return user", {token})
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export const updateUser = (user: User) => {
    return cypher(
        "MATCH (user:User {uuid: {uuid}}) " +
        "SET user.firstName = {firstName} " +
        "SET user.lastName = {lastName} " +
        "SET user.email = {email} " +
        "SET user.profilePhotoUrl = {profilePhotoUrl} " +
        "return user", {
            uuid: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl

        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export const createUserAndAuthentication = (user: User,
                                            service: string,
                                            authServiceUserId: string|number,
                                            authServiceToken: string) => {
    return cypher(
        `CREATE (auth:Authentication {service:{service}, userId:{authServiceUserId}, token:{authServiceToken}, date:{date}})
        CREATE (user:User {firstName:{firstName}, lastName:{lastName}, email:{email}, uuid:{uuid}, token:{token}})
        CREATE (user)-[:LOGGED_IN_USING]->(auth)
        RETURN user`,
        {
            uuid: user.id,
            token: user.token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
            service,
            authServiceUserId,
            authServiceToken,
            date: new Date()
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};