import Relay from "react-relay";
import {graphqlEndpoint} from "../config/ServerEndpoint";
import {EnhancedRelayNetworkLayer} from "./EnhancedRelayNetworkLayer";

let authTokenUsedByRelay = undefined;

Relay.injectNetworkLayer(
    new EnhancedRelayNetworkLayer(graphqlEndpoint, undefined, () => {
        return Promise.resolve(authTokenUsedByRelay && {
                Authorization: authTokenUsedByRelay
            });
    })
);

export function setRelayAuthToken(token: string) {
    authTokenUsedByRelay = token;
}

export function clearAuthToken() {
    authTokenUsedByRelay = undefined;
}

