import * as HttpClient from "../../system/HttpClient";
import * as AuthTokenStorage from "../../system/AuthTokenStorage";
import * as RelayNetworkConfig from "../../network/RelayNetworkConfig";
import {showLoginScreen} from "../login/LoginPageBootstrap";

export async function logout() {
    HttpClient.clearAuthToken();
    RelayNetworkConfig.clearAuthToken();
    await AuthTokenStorage.clearAuthToken();
    showLoginScreen();
}
