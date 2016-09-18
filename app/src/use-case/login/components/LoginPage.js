/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import LoginForm from "./LoginForm";
import * as HttpClient from "../../../system/HttpClient";
import * as AuthTokenStorage from "../../../system/AuthTokenStorage";
import {showMainApp} from "../../../MainBootstrap";

class LoginPage extends React.Component {

    render() {
        return (
            <View style={containerStyle}>
                <LoginForm onLogin={this.onLogin} />
            </View>
        );
    }

    async onLogin(user) {
        console.log("onLogin");

        const authToken = user.token;
        HttpClient.setAuthToken(authToken);
        await AuthTokenStorage.setAuthToken(authToken);
        showMainApp()
    }

}

const containerStyle = {
    flex: 1
};

export default LoginPage;
