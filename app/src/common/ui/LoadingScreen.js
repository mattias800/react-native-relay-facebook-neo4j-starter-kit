/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

export const LoadingScreen = React.createClass({

    render() {
        const {text} = this.props;
        return (
            <View style={containerStyle}>
                <ActivityIndicator />
                {
                    text && <Text>{text}</Text>
                }
            </View>
        );
    }

});

const containerStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
};