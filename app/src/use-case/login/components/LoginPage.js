/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import LoginForm from "./LoginForm";
import {whenLoggedIn} from "../../../services/LoginService";
import {IntroCarousel} from "./IntroCarousel";

class LoginPage extends React.Component {

    render() {

        return (
            <View style={containerStyle}>
                <View style={{...containerStyle, height:250}}>
                    <IntroCarousel height={250} />
                </View>
                <View style={containerStyle}>
                    <LoginForm onLogin={this.onLogin} />
                </View>
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
