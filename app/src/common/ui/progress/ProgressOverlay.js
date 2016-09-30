/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {AnimatedIcon, FAIL_COLOR} from "../AnimatedIcon";
import {FadeView} from "../FadeView";
const Spinner = require('react-native-spinkit');


export const ProgressOverlay = React.createClass({

    propTypes: {
        show: React.PropTypes.bool,
        text: React.PropTypes.string,
        success: React.PropTypes.bool,
        fail: React.PropTypes.bool
    },

    getDefaultProps: () => ({
        text: "Please wait..."
    }),

    render() {
        let {text, success, show, fail} = this.props;
        if (success) {
            fail = false;
        }
        return (
            <FadeView show={show}
                      opacity={0.7}
                      style={container}>
                <View style={wrapper}>
                    { success && <AnimatedIcon /> }

                    { fail && <AnimatedIcon icon="exclamation"
                                            iconColor={FAIL_COLOR} /> }

                    { !success && !fail && <Spinner type="ThreeBounce"
                                                    color="#ffffff"
                                                    size={57} /> }
                    { text && <Text style={textStyle}>{text}</Text>}
                </View>
            </FadeView>
        )
    }

});

const textStyle = {
    color: "#ffffff",
    fontSize: 16,
    paddingTop: 20
};

const wrapper = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
};

const container = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#222222"
};