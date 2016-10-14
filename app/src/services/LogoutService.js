import * as HttpClient from "../network/HttpClient";
import * as SessionStorage from "../system/SessionStorage";
import * as RelayNetworkConfig from "../network/RelayNetworkConfig";
import {reloadApplication} from "../common/system/ApplicationReloader";

export async function logout() {
    HttpClient.clearAuthToken();
    RelayNetworkConfig.clearRelaySession();
    await SessionStorage.clearSession();
    reloadApplication();
}
