import {AsyncStorage} from "react-native";

export const TOKEN_STORAGE_KEY = "authToken";

export async function getAuthToken() {
    return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
}

export async function setAuthToken(token: string) {
    return await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export async function clearAuthToken(token: string) {
    return await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
}

