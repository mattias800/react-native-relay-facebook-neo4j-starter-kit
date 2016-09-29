/* @flow */

import {endpoint} from "../config/ServerEndpoint";

let authToken = undefined;
let onNotAuthorized: Function = () => {
};

const baseHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export function setAuthToken(token: string) {
    console.log("setAuthToken(" + token + ")");
    authToken = token;
}

export function setOnNotAuthorized(callback: Function) {
    onNotAuthorized = callback;
}

export function clearAuthToken() {
    authToken = undefined;
}

export function get(url: string) {
    const fullUrl = endpoint + validateUrl(url);
    console.log("GET", fullUrl);
    return fetch(fullUrl, {
        headers: getGetHeaders()
    })
        .then(checkStatus)
        .then(parseJSON);
}

export function postDelete(url: string) {
    const fullUrl = endpoint + validateUrl(url);
    console.log("DELETE", fullUrl);
    return fetch(fullUrl, {
        method: "delete",
        headers: getGetHeaders()
    })
        .then(checkStatus);
}

export function postJson(url: string, model: Object) {
    const fullUrl = endpoint + validateUrl(url);
    console.log("POST", fullUrl, model);
    console.log(JSON.stringify(model));

    return fetch(fullUrl, {
        method: "post",
        headers: getPostHeaders(),
        body: JSON.stringify(model)
    })
        .then(response => {
            console.log("response");
            console.log(response);
            return response;
        })
        .then(checkStatus)
        .then(parseJSON);
}

export function putJson(url: string, model: Object) {
    const fullUrl = endpoint + validateUrl(url);
    console.log("PUT", fullUrl, model);
    console.log(JSON.stringify(model));

    return fetch(fullUrl, {
        method: "put",
        headers: getPostHeaders(),
        body: JSON.stringify(model)
    })
        .then(checkStatus)
        .then(parseJSON);
}

function getPostHeaders() {
    return authToken ? {
        ...baseHeaders,
        "Authorization": authToken
    } : baseHeaders;
}

function getGetHeaders() {
    return getPostHeaders();
}

function validateUrl(url: string): string {
    if (!url.startsWith("/")) {
        throw "URL must start with /";
    }
    if (url.endsWith("/")) {
        throw "URL must not end with /";
    }
    return url;
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        if (response.status === 401) {
            onNotAuthorized();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

