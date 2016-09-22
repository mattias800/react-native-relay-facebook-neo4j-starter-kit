import {AsyncStorage} from "react-native";

export const SESSION_STORAGE_KEY = "currentUserSession";

export async function getSession() {
    const data = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    return JSON.parse(data);
}

export async function getAuthToken() {
    return await getSession().token;
}

export async function getCurrentUserId() {
    return await getSession().currentUserId;
}
export async function setSession(token: string, currentUserId: string) {
    return await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({token, currentUserId}));
}

export async function clearSession(token: string) {
    return await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}

