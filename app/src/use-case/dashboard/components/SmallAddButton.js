/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-elements";

export const SmallAddButton = React.createClass(
    {

        propTypes: {},

        render() {
            return (
                <View alignItems="center"
                      justifyContent="center"
                      style={{...containerStyle, ...this.props.style}}>
                    <Icon name="camera"
                          size={24}
                          color="#777777"
                          type="font-awesome"
                          onPress={() => this.props.onPress()} />
                </View>
            );
        },

    });

const containerStyle = {
    borderWidth: 1,
    borderColor: "#777777"
};