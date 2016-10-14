import {AsyncStorage} from "react-native";

export const SESSION_STORAGE_KEY = "currentUserSession";

export async function getSession() {
    console.log("Fetching session from storage.");
    const data = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    const session = JSON.parse(data);
    return validateSession(session);
}

export async function setSession(sessionObjectFromServer) {
    console.log("Storing session in storage.");
    console.log(sessionObjectFromServer);
    return await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionObjectFromServer));
}

export async function clearSession() {
    return await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}

export async function setProfileComplete() {
    const session = await getSession();
    session.isCompleteProfile = true;
    await setSession(session);
}

function validateSession(session) {
    console.log("Validating session");
    console.log(session);

    if (session && session.user && session.user.token) {
        console.log("Session OK!");
        return session;
    } else {
        console.log("Invalid session");
        return undefined;
    }
}