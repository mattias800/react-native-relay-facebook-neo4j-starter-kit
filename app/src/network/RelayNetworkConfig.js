import Relay from "react-relay";
import {EnhancedRelayNetworkLayer} from "./EnhancedRelayNetworkLayer";
import {graphqlEndpoint} from "../config/ServerEndpoint";

let authTokenUsedByRelay = undefined;
let currentUserId = undefined;

console.log(`Using GraphQL endpoints: ${graphqlEndpoint}`);

Relay.injectNetworkLayer(new EnhancedRelayNetworkLayer(
    graphqlEndpoint,
    undefined,
    () => Promise.resolve({authentication: authTokenUsedByRelay}))
);

export function setRelaySession(token: string, userId: string) {
    authTokenUsedByRelay = token;
    currentUserId = userId;
}

export function clearRelaySession() {
    authTokenUsedByRelay = undefined;
    currentUserId = undefined;
}

export function getAuthTokenUsedByRelay() {
    return authTokenUsedByRelay;
}

export function getCurrentUserId() {
    return currentUserId;
}

