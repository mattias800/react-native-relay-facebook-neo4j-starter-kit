/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import MessagesContainer from "./use-case/containers/MessagesContainer";

const App = React.createClass({

    propTypes : {},

    render() {
        return (
            <View>
                <MessagesContainer/>
            </View>
        );
    }

});

export default App;
