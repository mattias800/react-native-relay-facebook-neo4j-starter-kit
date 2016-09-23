import {AsyncStorage} from "react-native";
import {registerScreens} from "./AppScreens";
import {showMainApp} from "./MainBootstrap";
import {showLoginScreen} from "./use-case/login/LoginPageBootstrap";
import * as HttpClient from "./network/HttpClient";
import * as SessionStorage from "./system/SessionStorage";
import {setRelaySession} from "./network/RelayNetworkConfig";
import {configureAccountKit} from "./system/account-kit/AccountKitConfigurator";

configureAccountKit();
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
