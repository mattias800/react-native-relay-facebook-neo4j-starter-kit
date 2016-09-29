/* @flow */
import {SERVICE_SMS, SERVICE_EMAIL} from "../services/AuthenticationService";
import {Authentication} from "./Authentication";

export class AccountKitAuthentication extends Authentication {

    service: string;
    accountId: string;
    appId: string;
    lastRefresh: number;
    refreshIntervalSeconds: number;

    constructor(service: string,
                accountId: string,
                appId: string,
                lastRefresh: number,
                refreshIntervalSeconds: number,
                token: string) {
        super(token);
        this.service = service;
        this.accountId = accountId;
        this.appId = appId;
        this.lastRefresh = lastRefresh;
        this.refreshIntervalSeconds = refreshIntervalSeconds;
    }

    static createFromPayload(service: string, payload: Object) {
        return new AccountKitAuthentication(service, payload.accountId, payload.appId, payload.lastRefresh, payload.refreshIntervalSeconds, payload.token);
    }

    static createFromSmsPayload(payload: Object) {
        return AccountKitAuthentication.createFromPayload(SERVICE_SMS, payload);
    }

    static createFromEmailPayload(payload: Object) {
        return AccountKitAuthentication.createFromPayload(SERVICE_EMAIL, payload);
    }
}