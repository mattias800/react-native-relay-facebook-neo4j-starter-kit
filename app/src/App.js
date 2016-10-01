import {AsyncStorage} from "react-native";
import {registerScreens} from "./AppScreens";
import {showLoginScreen} from "./bootstraps/LoginPageBootstrap";
import * as SessionStorage from "./system/SessionStorage";
import {configureAccountKit} from "./system/account-kit/AccountKitConfigurator";
import {whenLoggedIn} from "./services/LoginService";

configureAccountKit();
registerScreens();
bootApp();

async function bootApp() {
    console.log("Fetching session from storage.");

    const session = await SessionStorage.getSession();

    console.log("Booting app.");

    if (session) {
        whenLoggedIn(session);
    } else {
        showLoginScreen();
    }
}
