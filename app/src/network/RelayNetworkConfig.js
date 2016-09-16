import Relay from "react-relay";
import {graphqlEndpoint} from "../config/ServerEndpoint";
import {EnhancedRelayNetworkLayer} from "./EnhancedRelayNetworkLayer";

export function setupRelayNetworkLayerWithTokenProvider(tokenProvider: Function<Promise<string>>) {
    Relay.injectNetworkLayer(
        new EnhancedRelayNetworkLayer(graphqlEndpoint, undefined, tokenProvider)
    );
}

