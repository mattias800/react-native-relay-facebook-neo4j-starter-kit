/* @flow */
import {cypher} from "../neo4j/Neo4jConnector";
import {User} from "../../entities/User";
import {SERVICE_FACEBOOK} from "../../services/AuthenticationService";
import {FacebookAuthentication} from "../../entities/FacebookAuthentication";
import {AccountKitAuthentication} from "../../entities/AccountKitAuthentication";
import {Authentication} from "../../entities/Authentication";
import {Observable} from "rx";
import {getConnectionCustomMatchQuery, getConnectionMatchQuery} from "../util/QueryGenerator";

export async function getAllUsers(): Promise<Array<User>> {
    return Observable.fromPromise(cypher("MATCH (user:User) return user"))
                     .flatMap(Observable.from)
                     .map(result => result.user)
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
        .map(User.createFromEntity)
        .toArray()
        .toPromise();
}

export async function getFriendsOfUserConnection(user: User,
                                                 connectionArguments: Object,
                                                 orderByProperty: "id" | "createdAt" = "createdAt"): Promise<Array<User>> {
    const {id} = user;
    return Observable
        .fromPromise(
            cypher(
                getConnectionCustomMatchQuery(
                    "MATCH (u:User {id:{id}})-[:IS_FRIENDS_WITH]->(friend:User)",
                    "friend",
                    "friend",
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

export async function getUserById(id: string): Promise<User> {
    return await cypher(
        "MATCH (user:User {id: {id}}) return user", {id})
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

export async function getNumFriendsFor(user: User): Promise<number> {
    const {id} = user;
    return Observable
        .fromPromise(cypher("MATCH (u:User {id:{id}})-[:IS_FRIENDS_WITH]->(friend:User) return count(friend);", {id}))
        .map(result => result[0]["count(friend)"])
        .toPromise();
}

export async function isFriends(user1: User, user2: User): Promise<boolean> {
    if (user1.id === user2.id) {
        return false;
    }
    return Observable
        .fromPromise(cypher("MATCH (u:User {id:{id1}})-[:IS_FRIENDS_WITH]->(u2:User {id:{id2}}) return count(u);",
                            {
                                id1: user1.id,
                                id2: user2.id
                            }
        ))
        .map(result => result[0]["count(u)"])
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
        "MATCH (user:User {id: {id}}) " +
        "SET user.firstName = {firstName} " +
        "SET user.lastName = {lastName} " +
        "SET user.email = {email} " +
        "SET user.completedProfile = {completedProfile} " +
        "SET user.modifiedAt = {modifiedAt} " +
        "return user", {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
            completedProfile: user.isCompleteProfile(),
            modifiedAt: new Date()
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
        CREATE (user:User {firstName:{firstName}, lastName:{lastName}, email:{email}, id:{id}, token:{token}, completedProfile:{completedProfile}})
        CREATE (user)-[:LOGGED_IN_USING]->(auth)
        RETURN user`,
        {
            id: user.id,
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