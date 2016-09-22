import {AsyncStorage} from "react-native";
import {registerScreens} from "./AppScreens";
import {showMainApp} from "./MainBootstrap";
import {showLoginScreen} from "./use-case/login/LoginPageBootstrap";
import * as HttpClient from "./system/HttpClient";
import * as SessionStorage from "./system/SessionStorage";
import {setupRelayNetworkLayerWithTokenProvider} from "./network/RelayNetworkConfig";
import {setRelaySession} from "./network/RelayNetworkConfig";

registerScreens();
bootApp();


async function bootApp() {
    var session = await SessionStorage.getSession();

    if (session) {
        const {token, currentUserId} = session;
        HttpClient.setAuthToken(token);
        setRelaySession(token, currentUserId);
        showMainApp();
    } else {
        showLoginScreen();
    }
}
