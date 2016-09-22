import {loginWithFacebook} from "../system/facebook/FacebookService";
import {postJson} from "../network/HttpClient";

export function loginUsingFacebook() {
    console.log("Authenticating with Facebook");
    return loginWithFacebook()
        .then(r => {
            console.log("Authenticated with Facebook");
            console.log(r);
            return r;
        })
        .then(result => authenticateWithBackend("facebook", result.token.accessToken));
}

export function authenticateWithBackend(service: string, token: string) {
    console.log("Authenticating with backend");
    return postJson("/authenticate", {service, token})
        .then(r => {
            console.log("Authenticated with backend!");
            console.log(r);
            return r;
        });
}