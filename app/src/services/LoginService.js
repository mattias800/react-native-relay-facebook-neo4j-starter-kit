import {loginWithFacebook} from "../system/facebook/FacebookService";
import * as HttpClient from "../network/HttpClient";
import {postJson} from "../network/HttpClient";
import {loginWithSms, loginWithEmail} from "../system/account-kit/AccountKitService";
import * as SessionStorage from "../system/SessionStorage";
import {setRelaySession} from "../network/RelayNetworkConfig";
import {showMainAppScreen} from "../bootstraps/MainBootstrap";
import {showRegistrationScreen} from "../bootstraps/RegistrationPageBootstrap";
import {showLoginScreen} from "../bootstraps/LoginPageBootstrap";

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
        .then(async serverResponse => {
            console.log("Authenticated with backend");
            await SessionStorage.setSession(serverResponse);
            return serverResponse;
        });
}

export function authenticateWithBackend(service: string, payload: Object) {
    console.log("Authenticating with backend");
    return postJson("/authenticate", {service, payload})
        .then(serverResponse => {
            console.log("Authenticated with backend!");
            console.log(serverResponse);
            return serverResponse;
        });
}

export function loadSessionIntoClients(token: string, userId: string) {
    HttpClient.setAuthToken(token);
    setRelaySession(token, userId);
}

export function whenLoggedIn(serverResponse) {
    try {
        const {user, isCompleteProfile} = serverResponse;
        loadSessionIntoClients(user.token, user.id);
        if (isCompleteProfile) {
            showMainAppScreen();
        } else {
            showRegistrationScreen();
        }
    } catch (e) {
        console.log("Error when logging in");
        console.log(e);
        SessionStorage.clearSession();
        showLoginScreen();
    }
}