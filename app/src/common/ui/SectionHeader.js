/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";

export const SectionHeader = React.createClass(
    {
        propTypes: {
            label: React.PropTypes.string
        },

        render() {
            const {label} = this.props;
            return (
                <View style={container}
                      alignItems="center">
                    <Text style={textStyle}>{label}</Text>
                </View>
            );
        }

    });

const container = {
    padding: 8,
    backgroundColor: "#99ee99"
};

const textStyle = {
    color: "#559955"
};