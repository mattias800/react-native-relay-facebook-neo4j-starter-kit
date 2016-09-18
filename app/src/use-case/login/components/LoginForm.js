/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {Button} from "react-native-elements";
import {loginUsingFacebook} from "../../../services/LoginService";
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
                        <Button raised
                                icon={{name: 'facebook',  type: 'font-awesome'}}
                                title='LOGIN WITH FACEBOOK'
                                onPress={this.login} />
                }
            </View>
        );
    },

    login() {
        const {onLogin} = this.props;
        this.setState({fetching: true});
        loginUsingFacebook()
            .then(result => {
                console.log("Login success");

                this.setState({fetching: false});
                onLogin(result);
            })
            .catch(e => {
                console.log("Login failed");

                this.setState({fetching: false});
                if (e.isCancelled) {
                    alert("Login was cancelled.");
                } else {
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
