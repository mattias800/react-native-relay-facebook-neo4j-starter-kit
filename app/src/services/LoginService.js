import {loginWithFacebook} from "../system/facebook/FacebookService";
import * as HttpClient from "../network/HttpClient";
import {postJson} from "../network/HttpClient";
import {loginWithSms, loginWithEmail} from "../system/account-kit/AccountKitService";
import * as SessionStorage from "../system/SessionStorage";
import {setRelaySession} from "../network/RelayNetworkConfig";
import {showMainAppScreen} from "../bootstraps/MainBootstrap";
import {showRegistrationScreen} from "../bootstraps/RegistrationPageBootstrap";

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
        .then(async serviceUser => {
            console.log("Authenticated with service=" + serviceName);
            console.log(serviceUser);
            return serviceUser;
        })
        .then(result => authenticateWithBackend(serviceName, payloadTransformer(result)))
        .then(async user => {
            await SessionStorage.setSession(user.token, user.id, user);
            return user;
        });
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

export function loadSessionIntoClients(token: string, userId: string) {
    HttpClient.setAuthToken(token);
    setRelaySession(token, userId);
}

export function whenLoggedIn(user: Object, token: string, userId: string) {
    loadSessionIntoClients(token, userId);
    if (user.completeProfile) {
        showMainAppScreen()
    } else {
        showRegistrationScreen();
    }
}