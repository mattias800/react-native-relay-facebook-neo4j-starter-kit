/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export const Row = React.createClass({

    propTypes: {
        justifyContent: React.PropTypes.string,
        alignItems: React.PropTypes.string,
        alignSelf: React.PropTypes.string,
        backgroundColor: React.PropTypes.string,
        style: React.PropTypes.object
    },

    render() {
        const {children, justifyContent, alignItems, backgroundColor, style} = this.props;
        return (
            <View style={{...containerStyle, justifyContent, alignItems, backgroundColor, ...style}}>
                {children}
            </View>
        );
    }

});

const containerStyle = {
    flex: 1,
    flexDirection: "row"
};