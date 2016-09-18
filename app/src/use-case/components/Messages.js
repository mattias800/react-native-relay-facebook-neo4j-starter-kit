/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

const Messages = React.createClass({

    propTypes : {
        fetching : React.PropTypes.bool,
        messages : React.PropTypes.array
    },

    render() {
        const { messages, fetching } = this.props;

        return (
            <View>
                {
                    fetching ?
                        <View>
                            <Text>Loading...</Text>
                        </View>
                        :
                    messages && messages.map(message =>
                        <View key={message.id}>
                            <View>
                                <Text>{message.id}</Text>
                            </View>
                            <View>
                                <Text>{message.text}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        );
    }

});

export default Messages;
