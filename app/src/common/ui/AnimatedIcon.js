/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {Motion, spring, presets} from "react-motion";

export const SUCCESS_COLOR = color = "#00ff0f";
export const FAIL_COLOR = color = "#ff0f00";

export const AnimatedIcon = React.createClass({

    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        maxSize: React.PropTypes.number,
        icon: React.PropTypes.string,
        iconColor: React.PropTypes.string,
        type: React.PropTypes.string,
    },

    getDefaultProps: () => ({
        width: 100,
        height: 100,
        maxSize: 60,
        icon: "check",
        iconColor: SUCCESS_COLOR,
        type: "font-awesome"
    }),

    render() {
        const {width, height, maxSize, icon, iconColor, type} = this.props;

        return (
            <View style={{...container, width, height}}>
                <View style={flexContainer}>
                    <Motion defaultStyle={{size: 0}}
                            style={{size: spring(maxSize, presets.wobbly)}}>
                        {({size}) => <Icon name={icon}
                                           size={size}
                                           color={iconColor}
                                           type={type} />}
                    </Motion>
                </View>
            </View>
        );
    }

});

const flexContainer = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
};

const container = {};

