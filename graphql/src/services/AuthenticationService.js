var FB = require('fb');
import {
    createUserAndAuthentication,
    getUserByAuthenticationServiceToken,
    getUserByAuthenticationServiceAccountId,
    updateUser,
    getUserByEmail
} from "../persistence/service/UserService";
import {AccountKitAuthentication} from "../models/AccountKitAuthentication";
import {FacebookAuthentication} from "../models/FacebookAuthentication";
import {generateToken} from "../util/service/JwtService";
import {generateUuid} from "../util/service/UuidService";
import {User} from "../models/User";

export const SERVICE_FACEBOOK = "facebook";
export const SERVICE_SMS = "sms";
export const SERVICE_EMAIL = "email";

export async function authenticateOrCreateUserByPayload(service: string, payload: Object) {
    console.log("authenticateOrCreateUserByPayload()");
    let user;
    switch (service) {
        case SERVICE_FACEBOOK:
            user = await authenticateOrCreateUserByFacebook(service, payload);
            return user;
        case SERVICE_SMS:
        case SERVICE_EMAIL:
            user = await authenticateOrCreateUserByAccountKit(service, payload);
            return user;
        default:
            throw "Service must be facebook, sms or email.";
    }
}

async function authenticateOrCreateUserByAccountKit(service: string, payload: Object) {
    console.log("Authenticating user by AccountKit.");
    console.log("service='" + service + "'");
    console.log("payload");
    console.log(payload);
    console.log(JSON.stringify(payload));

    if (service !== SERVICE_SMS && service !== SERVICE_EMAIL) {
        console.log("Wrong service!");

        throw "authenticateOrCreateUserByAccountKit() requires service to be 'sms' or 'email'. Got: " + service;
    }

    console.log("Finding account kit user in DB by token");

    let userInDb = await getUserByAuthenticationServiceToken(service, payload.token);
    if (userInDb) {
        return userInDb;
    }

    console.log("Finding account kit user in DB by accountId");

    userInDb = await getUserByAuthenticationServiceAccountId(service, payload.token);
    if (userInDb) {
        return userInDb;
    }

    console.log("Creating new user");

    const uuid = generateUuid();
    const userAuthToken = generateToken(uuid);
    userInDb = await createUserAndAuthentication(
        new User(uuid, userAuthToken),
        new AccountKitAuthentication(service, payload.accountId, payload.appId, payload.lastRefresh, payload.refreshIntervalSeconds, payload.token));

    return userInDb;
}

async function authenticateOrCreateUserByFacebook(service: string, payload: Object) {
    console.log("Authenticating user by Facebook.");

    if (service !== SERVICE_FACEBOOK) {
        throw "authenticateOrCreateUserByFacebook() requires service to be 'facebook'. Got: " + service;
    }

    console.log("await getUserByAuthenticationServiceToken()");

    let userInDb = await getUserByAuthenticationServiceToken(service, payload.token);
    console.log("Done");

    if (userInDb) {
        console.log("Found user by token.");
        userInDb = await updateUserWithFacebookDataIfNeeded(payload.token, userInDb);
        return userInDb;
    }

    console.log("await getProfileFromFacebook");

    let facebookUser;

    facebookUser = await getProfileFromFacebook(payload.token);
    userInDb = await getUserByEmail(facebookUser.email);

    if (userInDb) {
        console.log("Found user by email.");
        userInDb = await updateUserWithFacebookDataIfNeeded(payload.token, userInDb, facebookUser);
        return userInDb;
    }

    console.log("Found no user, creating new.");

    const uuid = generateUuid();
    const userAuthToken = generateToken(uuid);
    userInDb = await createUserAndAuthentication(
        new User(uuid, userAuthToken, facebookUser.first_name, facebookUser.last_name, facebookUser.email, getProfilePhotoUrl(facebookUser)),
        new FacebookAuthentication(facebookUser.id, payload.token));

    return userInDb;
}

export function getProfileFromFacebook(token: string) {

    FB.setAccessToken(token);

    return new Promise((resolve, reject) => {
        FB.api('me', function (res) {
            if (!res || res.error) {
                reject(!res ? 'error occurred' : res.error);
            } else {
                resolve(res)
            }
        });

    });

}

export async function updateUserWithFacebookDataIfNeeded(facebookToken: string,
                                                         user: User,
                                                         facebookUser: ?Object): User {
    if (!user.id) {
        throw "Trying to update user, but user has no id.";
    }

    let hasAllData = Boolean(user.firstName && user.lastName && user.email && user.profilePhotoUrl);

    if (!hasAllData) {

        if (!facebookUser) {
            console.log("Is missing facebook user, fetching");
            facebookUser = await getProfileFromFacebook(facebookToken);
            console.log("fetch done");

        }
        user.firstName = facebookUser.first_name;
        user.lastName = facebookUser.last_name;
        user.email = facebookUser.email;
        user.profilePhotoUrl = getProfilePhotoUrl(facebookUser);
        user = await updateUser(user);
    }
    return user;
}

function getProfilePhotoUrl(facebookUser) {
    return `https://graph.facebook.com/${facebookUser.id}/picture?type=square&width=300&height=300`;
}
