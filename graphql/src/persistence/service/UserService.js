/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {SERVICE_FACEBOOK} from "../../services/AuthenticationService";
import {FacebookAuthentication} from "../../entities/FacebookAuthentication";
import {AccountKitAuthentication} from "../../entities/AccountKitAuthentication";
import {Authentication} from "../../entities/Authentication";
import {Observable} from "rx";

export async function getAllUsers(): Promise<Array<User>> {
    return Observable.fromPromise(cypher("MATCH (user:User) return user"))
        .flatMap(Observable.from)
        .map(result => result.user)
        .map(User.createFromEntity)
        .toArray()
        .toPromise()
}

export async function getAllUsersWithCompleteProfile(): Promise<Array<User>> {
    console.log("getAllUsersWithCompleteProfile");
    const users = await getAllUsers();
    return users.filter(user => user.isCompleteProfile());
}

export async function getAllUsersWithIncompleteProfile(): Promise<Array<User>> {
    const users = await getAllUsers();
    return users.filter(user => !user.isCompleteProfile());
}

export async function getUserByAuthenticationServiceToken(service: string, token: string): Promise<User> {
    return await cypher(
        "MATCH (user:User)-[:LOGGED_IN_USING]->(auth:Authentication {service: {service}, token: {token}}) RETURN user",
        {
            token,
            service
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
}

export async function getUserByAuthenticationServiceAccountId(service: string, accountId: string): Promise<User> {
    return await cypher(
        "MATCH (user:User)-[:LOGGED_IN_USING]->(auth:Authentication {service: {service}, accountId: {accountId}}) RETURN user",
        {
            accountId,
            service
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
}

export async function getUserByEmail(email: string): Promise<User> {
    return Observable
        .fromPromise(cypher("MATCH (user:User {email: {email}}) return user", {email}))
        .flatMap(Observable.from)
        .map(result => result.user)
        .first()
        .map(User.createFromEntity)
        .toPromise();
}

export async function getUserById(uuid: string): Promise<User> {
    return await cypher(
        "MATCH (user:User {uuid: {uuid}}) return user", {uuid})
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
}

export async function getUserByServiceAndAuthToken(service: string, token: string): Promise<User> {
    return await cypher(
        "MATCH (user:User {service: {service}, token: {token}}) return user", {token, service})
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
}

export async function getUserByAuthToken(token: string): Promise<User> {
    return await cypher(
        "MATCH (user:User {token: {token}}) return user", {token})
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => {
            if (!user) {
                throw "Invalid token.";
            }
            return user;
        })
        .then(user => user && User.createFromEntity(user));
}

export async function getFriendsFor(user: User): Promise<Array<User>> {
    const {entityId} = user;
    return Observable
        .fromPromise(cypher("MATCH (u:User {uuid:{entityId}})-[:IS_FRIENDS_WITH]->(friend:User) return friend;", {entityId}))
        .flatMap(Observable.from)
        .map(result => result.friend)
        .map(User.createFromEntity)
        .toArray()
        .toPromise();
}

export async function updateUser(user: User): Promise<User> {
    if (!user) {
        throw "Unable to update user: no user was specified.";
    }
    if (!user.id) {
        throw "Unable to update user: specified user has no id.";
    }
    return await cypher(
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
}

export async function createUserAndAuthentication(user: User,
                                                  authentication: Authentication): Promise<User> {

    if (user.email) {
        const userByEmail = await getUserByEmail(user.email);
        if (userByEmail) {
            throw "E-mail is already registered.";
        }
    }

    return await cypher(
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
            completedProfile: user.isCompleteProfile(),
            date: new Date(),
            ...(authentication instanceof FacebookAuthentication
                ? createArgsForFacebookAuthentication(authentication)
                : createArgsForAccountKitAuthentication(authentication))
        })
        .then(results => results.map(result => result.user))
        .then(users => users.length > 0 ? users[0] : undefined)
        .then(user => user && User.createFromEntity(user));
}

function createArgsForFacebookAuthentication(authentication: FacebookAuthentication) {
    return {
        service: authentication.service,
        serviceUserId: authentication.userId,
        serviceToken: authentication.token
    }
}

function createArgsForAccountKitAuthentication(authentication: AccountKitAuthentication) {
    return {
        service: authentication.service,
        serviceToken: authentication.token,
        serviceAccountId: authentication.accountId,
        serviceAppId: authentication.appId,
        serviceLastRefresh: authentication.lastRefresh,
        serviceRefreshIntervalSeconds: authentication.refreshIntervalSeconds
    }
}