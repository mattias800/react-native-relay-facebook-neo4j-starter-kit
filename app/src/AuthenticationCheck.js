/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import LoginPage from "./use-case/login/components/LoginPage";


export const AuthenticationCheck = React.createClass({

    propTypes: {
        login: React.PropTypes.node.isRequired
    },

    render() {
        const {children} = this.props;

        const authenticated = false;

        return authenticated ? children : <LoginPage />;
    }

});
