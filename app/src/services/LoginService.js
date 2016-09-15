import {loginWithFacebook} from "../system/facebook/FacebookService";
import {postJson} from "../system/HttpClient";

export function loginUsingFacebook() {
    return loginWithFacebook()
        .then(result => authenticateWithBackend("facebook", result.token.accessToken));
}

export function authenticateWithBackend(service: string, token: string) {
    return postJson("/authenticate", {service, token});
}