import * as HttpClient from "../network/HttpClient";
import * as SessionStorage from "../system/SessionStorage";
import * as RelayNetworkConfig from "../network/RelayNetworkConfig";
import {showLoginScreen} from "../bootstraps/LoginPageBootstrap";

export async function logout() {
    HttpClient.clearAuthToken();
    RelayNetworkConfig.clearRelaySession();
    await SessionStorage.clearSession();
    showLoginScreen();
}
