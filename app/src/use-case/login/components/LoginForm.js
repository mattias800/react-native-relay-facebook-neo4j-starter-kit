/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {Button} from "react-native-elements";
import {loginUsingFacebook} from "../../../services/LoginService";
import {loginUsingSms} from "../../../services/LoginService";
import {loginUsingEmail} from "../../../services/LoginService";
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

const LoginForm = React.createClass({

    propTypes: {
        onLogin: React.PropTypes.func.isRequired
    },

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
                        <View>
                            <Button raised
                                    icon={{name: 'facebook',  type: 'font-awesome'}}
                                    title='LOGIN WITH FACEBOOK'
                                    onPress={() => this.loginWithService(loginUsingFacebook)} />
                            <Button raised
                                    icon={{name: 'phone',  type: 'font-awesome'}}
                                    title='LOGIN WITH SMS'
                                    onPress={() => this.loginWithService(loginUsingSms)} />
                            <Button raised
                                    icon={{name: 'envelope',  type: 'font-awesome'}}
                                    title='LOGIN WITH EMAIL'
                                    onPress={() => this.loginWithService(loginUsingEmail)} />
                        </View>
                }
            </View>
        );
    },

    loginWithService(loginService: Function) {
        const {onLogin} = this.props;
        this.setState({fetching: true});
        loginService()
            .then(result => {
                this.setState({fetching: false});
                onLogin(result);
            })
            .catch(e => {
                this.setState({fetching: false});
                if (!e.isCancelled) {
                    alert("Error when trying to login.");
                }
            });
    }

});


const containerStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
};

export default LoginForm;
