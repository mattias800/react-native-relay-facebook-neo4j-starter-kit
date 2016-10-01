/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import LoginForm from "./LoginForm";
import {IntroCarousel} from "./IntroCarousel";

class LoginPage extends React.Component {

    render() {

        return (
            <View style={containerStyle}>
                <View style={{...containerStyle, height:250}}>
                    <IntroCarousel height={250} />
                </View>
                <View style={containerStyle}>
                    <LoginForm />
                </View>
            </View>
        );
    }

}

const containerStyle = {
    flex: 1
};

export default LoginPage;
