/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import MainContent from "./MainContent";


export default class ScrollableMainContent extends React.Component {
    render() {
        return (
            <ScrollView>
                <MainContent style={{paddingTop:18}}>{this.props.children}</MainContent>
            </ScrollView>
        );
    }
}