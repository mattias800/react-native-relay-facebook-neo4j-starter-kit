/* @flow */
import {SERVICE_FACEBOOK} from "../services/AuthenticationService";
import {Authentication} from "./Authentication";

export class FacebookAuthentication extends Authentication {

    service: string = SERVICE_FACEBOOK;
    userId: string;
    token: string;


    constructor(userId: string, token: string) {
        super(token);
        this.userId = userId;
    }

    static createFromPayload(payload: Object) {
        return new FacebookAuthentication(SERVICE_FACEBOOK, payload.userId, payload.token);
    }

}