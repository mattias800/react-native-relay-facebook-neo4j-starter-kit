/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Motion, spring} from "react-motion";

export const FadeView = React.createClass({

    propTypes: {
        show: React.PropTypes.bool,
        opacity: React.PropTypes.number
    },

    getDefaultProps: () => ({
        opacity: 1
    }),

    render() {
        const {show, opacity, style} = this.props;
        const showOpacity = opacity;
        const hideOpacity = 0.0;
        const fromOpacity = show ? hideOpacity : showOpacity;
        const toOpacity = show ? showOpacity : hideOpacity;

        return (
            <Motion defaultStyle={{opacity: fromOpacity}}
                    style={{opacity: spring(toOpacity)}}>
                {
                    ({opacity}) => {
                        return opacity > 0 && (
                                <View style={{...style, opacity}}>
                                    {this.props.children}
                                </View>
                            );
                    }
                }
            </Motion>

        );
    }

});
