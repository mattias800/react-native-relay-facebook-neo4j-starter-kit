/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import LoginPage from "./use-case/login/components/LoginPage";
import {setAuthToken} from "./system/HttpClient";
import {setupRelayNetworkLayerWithTokenProvider} from "./network/RelayNetworkConfig";

let authToken = undefined;

setupRelayNetworkLayerWithTokenProvider(() => {
    return Promise.resolve({
        Authorization: authToken
    });
});

export const AuthenticationCheck = React.createClass({

    propTypes: {},

    getInitialState() {
        return {
            authenticated: false
        }
    },

    render() {
        const {children} = this.props;

        const {authenticated} = this.state;

        return authenticated ? children : <LoginPage onLogin={this.loggedIn}
                                                     onLogout={this.loggedOut} />;
    },

    loggedIn(user) {
        setAuthToken(user.token);
        authToken = user.token;
        this.setState({authenticated: true});
    },

    loggedOut() {
        this.setState({authenticated: false});
    }

});
