import Relay from "react-relay";
import {graphqlEndpoint} from "../config/ServerEndpoint";

export function setupAuthenticationInRelay(token: string) {
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(graphqlEndpoint, {
            headers: {
                Authorization: token
            }
        })
    );
}

export function setupRelayWithoutAuthentication() {
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(graphqlEndpoint)
    );
}
