var FB = require('fb');
import {createUserAndAuthentication, getUserByAuthenticationService} from "../persistence/service/UserService";

export async function authenticateOrCreateUser(service: string, token: string) {
    if (service !== "facebook") {
        throw "Invalid service. Only Facebook supported.";
    }
    let userInDb = await getUserByAuthenticationService(service, token);
    if (!userInDb) {
        const facebookUser = await getProfileFromFacebook(token);
        userInDb = await createUserAndAuthentication(facebookUser.first_name, facebookUser.last_name, facebookUser.email, service, facebookUser.id, token);
    }
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