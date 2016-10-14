import {getUserByAuthToken} from "../persistence/service/UserService";

export async function getAndValidateUserByToken(token: ?string) {

    if (!token) {
        throw "Missing access token";
    }

    const viewer = await getUserByAuthToken(token);

    if (!viewer) {
        throw "Invalid access token";
    }

    return viewer;

}