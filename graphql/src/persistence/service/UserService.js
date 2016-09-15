import {cypher, matchById} from "../neo4j/Neo4jConnector";
import {generateToken} from "../../util/service/JwtService";
import {generateUuid} from "../../util/service/UuidService";

export const getAllUsers = () => {
    return cypher(
        "match (user:User) return user")
        .then(results => results.map(result => result.user));

};

export const getUserByAuthenticationService = (service: string, token: string) => {
    return cypher(
        "match (user:User)-[:LOGGED_IN_USING]->(auth:Authentication {service: {service}, token: {token}}) return user",
        {
            token,
            service
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined);
};

export const getUserByUuid = (uuid: string) => {
    return cypher(
        "match (user:User {uuid: {uuid}}) return user", {uuid})
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined);
};

export const createUserAndAuthentication = (firstName: string,
                                            lastName: string,
                                            email: string,
                                            service: string,
                                            authServiceUserId: string|number,
                                            authServiceToken: string) => {
    const uuid = generateUuid();
    const token = generateToken(uuid);
    return cypher(
        `CREATE (auth:Authentication {service:{service}, userId:{authServiceUserId}, token:{authServiceToken}, date:{date}})
        CREATE (user:User {firstName:{firstName}, lastName:{lastName}, email:{email}, uuid:{uuid}, token:{token}})
        CREATE (user)-[:LOGGED_IN_USING]->(auth)
        RETURN user`,
        {
            firstName,
            lastName,
            email,
            uuid,
            token,
            service,
            authServiceUserId,
            authServiceToken,
            date: new Date()
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined);
};