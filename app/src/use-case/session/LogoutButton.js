/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as LogoutService from "../../services/LogoutService";
import {Button} from "react-native-elements";

export const LogoutButton = React.createClass({

    propTypes: {},

    render() {
        return (
            <View>
                <Button raised
                        icon={{name: 'sign-out',  type: 'font-awesome'}}
                        title='LOGOUT'
                        onPress={LogoutService.logout} />
            </View>
        );
    }

});
