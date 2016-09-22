import * as HttpClient from "../../system/HttpClient";
import * as SessionStorage from "../../system/SessionStorage";
import * as RelayNetworkConfig from "../../network/RelayNetworkConfig";
import {showLoginScreen} from "../login/LoginPageBootstrap";

export async function logout() {
    HttpClient.clearAuthToken();
    RelayNetworkConfig.clearRelaySession();
    await SessionStorage.clearSession();
    showLoginScreen();
}
