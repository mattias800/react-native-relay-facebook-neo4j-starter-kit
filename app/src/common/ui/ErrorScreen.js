/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export const ErrorScreen = React.createClass({

    render() {
        const {text, error} = this.props;
        return (
            <View style={containerStyle}>
                <Text>Error:</Text>
                {
                    error && error.name && <Text>{error.name}</Text>
                }
                {
                    error && <Text>{JSON.stringify(error)}</Text>
                }
                {
                    text && <Text>{text}</Text>
                }
                <Text>Please try again later.</Text>
            </View>
        );
    }

});

const containerStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
};