/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";

export const OsMenuPadding = React.createClass({

    propTypes: {
        backgroundColor: React.PropTypes.string
    },

    getDefaultProps: () => ({
        backgroundColor: "#ffffff"
    }),

    render() {

        const {backgroundColor} = this.props;

        return (
            <View style={{height: 20, backgroundColor, opacity:0.5}} />
        );
    }

});
