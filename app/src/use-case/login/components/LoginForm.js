/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator, TouchableHighlight} from "react-native";
import {Button} from "react-native-elements";
import {loginUsingFacebook, loginUsingSms, loginUsingEmail, whenLoggedIn} from "../../../services/LoginService";
import {serviceColors} from "../../../common/ui/colors/ServiceColors";
import {Column} from "../../../common/ui/Column";
import {Cell} from "../../../common/ui/Cell";

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

const LoginForm = React.createClass({

    propTypes: {},

    getInitialState() {
        return {
            fetching: false
        };
    },

    render() {
        const {onLogin} = this.props;
        const {fetching} = this.state;

        return (
            <View style={containerStyle}>
                {
                    fetching ?
                        <View>
                            <ActivityIndicator style={{paddingBottom:10}} />
                            <Text>Signing in...</Text>
                        </View>
                        :
                        <Column>
                            <Cell paddingBottom={10}>
                                <View style={centeredTextContainer}>
                                    <Text style={textStyle}>Sign up or log in with</Text>
                                </View>
                            </Cell>
                            <Button small
                                    backgroundColor={serviceColors.facebook}
                                    icon={{name: 'facebook',  type: 'font-awesome'}}
                                    title='Facebook'
                                    onPress={() => this.loginWithService(loginUsingFacebook)} />
                            <Button
                                small
                                icon={{name: 'phone',  type: 'font-awesome'}}
                                backgroundColor="#489848"
                                title='Mobile number'
                                onPress={() => this.loginWithService(loginUsingSms)} />
                            <Cell paddingTop={10}>
                                <View style={centeredTextContainer}>
                                    <Text style={textStyle}>Or log in or sign up </Text><Text style={{...textStyle, ...emailLink}}
                                                                                              onPress={() => this.loginWithService(loginUsingEmail)}>via e-mail</Text>
                                </View>
                            </Cell>
                        </Column>
                }
            </View>
        );
    },

    loginWithService(loginService: Function) {
        const {onLogin} = this.props;
        this.setState({fetching: true});
        loginService()
            .then(sessionObjectFromServer => {
                this.setState({fetching: false});
                whenLoggedIn(sessionObjectFromServer);
            })
            .catch(e => {
                this.setState({fetching: false});
                if (!e.isCancelled) {
                    alert("Error when trying to login.");
                }
            });
    }

});

const textStyle = {
    fontSize: 12,
    color: "#999999"
};

const containerStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20
};

const centeredTextContainer = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
};

const emailLink = {
    color: "#44cc44"
};

export default LoginForm;
