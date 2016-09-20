import Relay from "react-relay";
import {EnhancedRelayNetworkLayer} from "./EnhancedRelayNetworkLayer";
import {graphqlEndpoint} from "../config/ServerEndpoint";

let authTokenUsedByRelay = undefined;

console.log(`Using GraphQL endpoints: ${graphqlEndpoint}`);

Relay.injectNetworkLayer(new EnhancedRelayNetworkLayer(graphqlEndpoint));

export function setRelayAuthToken(token: string) {
    authTokenUsedByRelay = token;
}

export function clearAuthToken() {
    authTokenUsedByRelay = undefined;
}

export function getAuthTokenUsedByRelay() {
    return authTokenUsedByRelay;
}

