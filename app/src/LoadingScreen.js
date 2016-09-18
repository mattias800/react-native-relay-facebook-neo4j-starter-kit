/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

const LoadingScreen = React.createClass({
    
    propTypes : {},
    
    render() {
        return (
            <View>
                <Text>Connecting to server...</Text>
            </View>
        );
    }
    
});

export default LoadingScreen;
