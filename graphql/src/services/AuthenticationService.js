var FB = require('fb');
import {createUserAndAuthentication, getUserByAuthenticationService} from "../persistence/service/UserService";
import {generateToken} from "../util/service/JwtService";
import {generateUuid} from "../util/service/UuidService";
import {updateUser} from "../persistence/service/UserService";
import {User} from "../models/User";
import {getUserByEmail} from "../persistence/service/UserService";

export async function authenticateOrCreateUser(service: string, token: string) {
    console.log("Authenticating user.");

    if (service !== "facebook") {
        throw "Invalid service. Only Facebook supported.";
    }
    console.log("await getUserByAuthenticationService()");

    let userInDb = await getUserByAuthenticationService(service, token);
    console.log("Done");

    if (userInDb) {
        console.log("Found user by token.");
        userInDb = await updateUserWithFacebookDataIfNeeded(token, userInDb);
        return userInDb;
    }

    console.log("await getProfileFromFacebook");

    const facebookUser = await getProfileFromFacebook(token);
    userInDb = await getUserByEmail(facebookUser.email);
    if (userInDb) {
        console.log("Found user by email.");
        userInDb = await updateUserWithFacebookDataIfNeeded(token, userInDb, facebookUser);
        return userInDb;
    }

    console.log("Found no user, creating new.");

    const uuid = generateUuid();
    const userAuthToken = generateToken(uuid);
    userInDb = await createUserAndAuthentication(
        new User(uuid, userAuthToken, facebookUser.first_name, facebookUser.last_name, facebookUser.email, getProfilePhotoUrl(facebookUser)),
        service,
        facebookUser.id,
        token
    );

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
