import {loginWithFacebook} from "../system/facebook/FacebookService";
import {postJson} from "../network/HttpClient";
import {loginWithSms} from "../system/account-kit/AccountKitService";
import {loginWithEmail} from "../system/account-kit/AccountKitService";

export function loginUsingFacebook() {
    return loginUsingService(loginWithFacebook, "facebook", result => ({token: result.token.accessToken}));
}

export function loginUsingSms() {
    return loginUsingService(loginWithSms, "sms", result => ({...result}));
}

export function loginUsingEmail() {
    return loginUsingService(loginWithEmail, "email", result => ({...result}));
}

function loginUsingService(loginFunction: Function, serviceName: string, payloadTransformer: Function) {
    console.log("Authenticating with service=" + serviceName);
    return loginFunction()
        .then(r => {
            console.log("Authenticated with service=" + serviceName);
            console.log(r);
            return r;
        })
        .then(result => authenticateWithBackend(serviceName, payloadTransformer(result)));
}

export function authenticateWithBackend(service: string, payload: Object) {
    console.log("Authenticating with backend");
    return postJson("/authenticate", {service, payload})
        .then(r => {
            console.log("Authenticated with backend!");
            console.log(r);
            return r;
        });
}