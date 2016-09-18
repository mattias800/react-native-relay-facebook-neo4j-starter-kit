import {AsyncStorage} from "react-native";
import {registerScreens} from "./AppScreens";
import {showMainApp} from "./MainBootstrap";
import {showLoginScreen} from "./use-case/login/LoginPageBootstrap";
import {getAuthToken} from "./system/AuthTokenStorage";
import * as HttpClient from "./system/HttpClient";
import * as AuthTokenStorage from "./system/AuthTokenStorage";
import {setupRelayNetworkLayerWithTokenProvider} from "./network/RelayNetworkConfig";
import {setRelayAuthToken} from "./network/RelayNetworkConfig";

registerScreens();
bootApp();


async function bootApp() {
    var authToken = await getAuthToken();
    console.log("authToken", authToken);

    if (authToken) {
        HttpClient.setAuthToken(authToken);
        setRelayAuthToken(authToken);
        showMainApp();
    } else {
        showLoginScreen();
    }
}
