/* @flow */
import {AppRegistry, StyleSheet, Text, View, NativeModules} from "react-native";

export function reloadApplication() {
    const {BridgeManager} = NativeModules;
    BridgeManager.reload();
}