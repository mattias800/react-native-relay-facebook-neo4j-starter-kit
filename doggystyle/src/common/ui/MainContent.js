/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';


export default class MainContent extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={{paddingTop:18}}>{this.props.children}</View>
            </ScrollView>
        );
    }
}