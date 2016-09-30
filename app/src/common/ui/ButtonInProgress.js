/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";

export const ButtonInProgress = React.createClass({

    propTypes: {},

    render() {
        return (
            <Button raised
                    backgroundColor="#ccc"
                    icon={{name: 'check',  type: 'font-awesome'}}
                    title='CONTINUE'
                    onPress={() => this.onSubmit()} />
        );
    }

});
