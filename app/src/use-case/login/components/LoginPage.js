/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import LoginForm from "./LoginForm";
import {whenLoggedIn} from "../../../services/LoginService";

class LoginPage extends React.Component {

    render() {
        return (
            <View style={containerStyle}>
                <LoginForm onLogin={this.onLogin} />
            </View>
        );
    }

    async onLogin(user) {
        whenLoggedIn(user, user.token, user.id)
    }

}

const containerStyle = {
    flex: 1
};

export default LoginPage;
