/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight} from "react-native";

export const SelectedItem = React.createClass(
    {

        propTypes: {},

        render() {
            const {label, onRemove} = this.props;

            return (
                <View style={containerStyle}>
                    <Text style={labelStyle}>{label}</Text>
                    <TouchableHighlight style={removeButtonStyle}
                                        onPress={() => onRemove()}>
                        <Text style={removeButtonIconStyle}>x</Text>
                    </TouchableHighlight>
                </View>
            );
        }

    });

const containerStyle = {
    flexDirection: "row",
    backgroundColor: "#bbbbff",
    marginRight: 2,
    paddingLeft: 4,
    paddingRight: 4
};

const labelStyle = {
    color: "#333333"
};

const removeButtonStyle = {
    marginLeft: 5
};

const removeButtonIconStyle = {
    color: "#ffffff"
};