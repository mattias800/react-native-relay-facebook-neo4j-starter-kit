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
import * as SessionStorage from "../../../system/SessionStorage";
import {showMainApp} from "../../../MainBootstrap";
import {setRelaySession} from "../../../network/RelayNetworkConfig";

class LoginPage extends React.Component {

    render() {
        return (
            <View style={containerStyle}>
                <LoginForm onLogin={this.onLogin} />
            </View>
        );
    }

    async onLogin(user) {
        const {token, id} = user;
        HttpClient.setAuthToken(token);
        setRelaySession(token, id);
        await SessionStorage.setSession(token, id);
        showMainApp()
    }

}

const containerStyle = {
    flex: 1
};

export default LoginPage;
