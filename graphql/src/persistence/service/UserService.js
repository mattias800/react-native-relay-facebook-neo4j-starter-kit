import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../models/User";
import {SERVICE_FACEBOOK} from "../../services/AuthenticationService";
import {FacebookAuthentication} from "../../models/FacebookAuthentication";
import {AccountKitAuthentication} from "../../models/AccountKitAuthentication";

export const getAllUsers = () => {
    return cypher(
        "MATCH (user:User) return user")
        .then(results => results.map(result => result.user))
        .then(users => users.map(user => User.createFromEntity(user)));
};

export const getAllUsersWithCompleteProfile = () => {
    return cypher(
        "MATCH (user:User {completedProfile:true}) return user")
        .then(results => results.map(result => result.user))
        .then(users => users.map(user => User.createFromEntity(user)));
};

export const getAllUsersWithIncompleteProfile = () => {
    return cypher(
        "MATCH (user:User) WHERE user.completedProfile = false OR NOT EXISTS (user.completedProfile) RETURN user")
        .then(results => results.map(result => result.user))
        .then(users => users.map(user => User.createFromEntity(user)));
};

export const getUserByAuthenticationServiceToken = (service: string, token: string) => {
    return cypher(
        "MATCH (user:User)-[:LOGGED_IN_USING]->(auth:Authentication {service: {service}, token: {token}}) RETURN user",
        {
            token,
            service
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export const getUserByAuthenticationServiceAccountId = (service: string, accountId: string) => {
    return cypher(
        "MATCH (user:User)-[:LOGGED_IN_USING]->(auth:Authentication {service: {service}, accountId: {accountId}}) RETURN user",
        {
            accountId,
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

export const getUserByServiceAndAuthToken = (service: string, token: string) => {
    return cypher(
        "MATCH (user:User {service: {service}, token: {token}}) return user", {token, service})
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
    if (!user) {
        throw "Unable to update user: no user was specified.";
    }
    if (!user.id) {
        throw "Unable to update user: specified user has no id.";
    }
    return cypher(
        "MATCH (user:User {uuid: {uuid}}) " +
        "SET user.firstName = {firstName} " +
        "SET user.lastName = {lastName} " +
        "SET user.email = {email} " +
        "SET user.completedProfile = {completedProfile} " +
        "SET user.profilePhotoUrl = {profilePhotoUrl} " +
        "return user", {
            uuid: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
            completedProfile: user.isCompleteProfile()
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
};

export async function createUserAndAuthentication(user: User,
                                                  authentication: FacebookAuthentication|AccountKitAuthentication) {

    if (user.email) {
        var userByEmail = await getUserByEmail(user.email);
        if (userByEmail) {
            throw "E-mail is already registered.";
        }
    }

    return cypher(
        `${authentication.service === SERVICE_FACEBOOK
            ? `CREATE (auth:Authentication {service:{service}, userId:{serviceUserId}, token:{serviceToken}, date:{date}})`
            : `CREATE (auth:Authentication {service:{service}, accountId:{serviceAccountId}, appId:{serviceAppId}, 
            lastRefresh:{serviceLastRefresh}, refreshIntervalSeconds:{serviceRefreshIntervalSeconds}, token:{serviceToken}, date:{date}})`}
        CREATE (user:User {firstName:{firstName}, lastName:{lastName}, email:{email}, uuid:{uuid}, token:{token}, completedProfile:{completedProfile}})
        CREATE (user)-[:LOGGED_IN_USING]->(auth)
        RETURN user`,
        {
            uuid: user.id,
            token: user.token,
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            email: user.email || null,
            profilePhotoUrl: user.profilePhotoUrl || null,
            service: authentication.service,
            serviceUserId: authentication.userId,
            serviceToken: authentication.token,
            serviceAccountId: authentication.accountId,
            serviceAppId: authentication.appId,
            serviceLastRefresh: authentication.lastRefresh,
            serviceRefreshIntervalSeconds: authentication.refreshIntervalSeconds,
            completedProfile: user.isCompleteProfile(),
            date: new Date()
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
}


