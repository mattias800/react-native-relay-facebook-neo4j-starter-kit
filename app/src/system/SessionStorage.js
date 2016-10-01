import {AsyncStorage} from "react-native";

export const SESSION_STORAGE_KEY = "currentUserSession";

export async function getSession() {
    const data = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    const session = JSON.parse(data);
    return validateSession(session);
}

export async function setSession(token: string, currentUserId: string, user: Object) {
    return await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({token, currentUserId, user}));
}

export async function clearSession(token: string) {
    return await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}

function validateSession(session) {
    if (!session) {
        return undefined;
    }
    const {token, currentUserId, user} = session;
    if (token && currentUserId && user) {
        return session;
    } else {
        return undefined;
    }
}