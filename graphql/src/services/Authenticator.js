import {getUserByAuthToken} from "../persistence/service/UserService";

export async function validateToken(token: string) {
    const viewer = await getUserByAuthToken(token);

    if (!viewer) {
        throw "Invalid access token";
    }

    return viewer;

}