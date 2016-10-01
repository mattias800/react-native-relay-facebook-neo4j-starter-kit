/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";

export const Cell = React.createClass({

    propTypes: {
        paddingLeft: React.PropTypes.number,
        paddingRight: React.PropTypes.number,
        paddingTop: React.PropTypes.number,
        paddingBottom: React.PropTypes.number,
        backgroundColor: React.PropTypes.string,
        style: React.PropTypes.object
    },

    render() {
        const {children, paddingLeft, paddingRight, paddingTop, paddingBottom, backgroundColor, style} = this.props;
        return (
            <View style={{...containerStyle, paddingLeft, paddingRight, paddingTop, paddingBottom, backgroundColor, ...style}}>
                {children}
            </View>
        );
    }

});

const containerStyle = {};
