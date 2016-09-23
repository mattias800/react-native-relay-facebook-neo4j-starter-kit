import {SERVICE_FACEBOOK, SERVICE_SMS, SERVICE_EMAIL} from "../services/AuthenticationService";

export class FacebookAuthentication {

    service: string = SERVICE_FACEBOOK;
    userId: string;
    token: string;


    constructor(userId: string, token: string) {
        this.userId = userId;
        this.token = token;
    }

    static createFromPayload(payload: Object) {
        return new FacebookAuthentication(SERVICE_FACEBOOK, payload.userId, payload.token);
    }

}