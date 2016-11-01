/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, Image} from "react-native";

class PostMediaFormComponent extends React.Component {

    render() {
        const {user, imageSource} = this.props;
        return (
            <View>
                <Text>PostMediaForm</Text>
                <Image source={imageSource}
                       style={photoStyle} />
            </View>
        );
    }

}

export const PostMediaForm = Relay.createContainer(PostMediaFormComponent, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                firstName
                lastName
            }
    `,
    },
});

const photoStyle = {
    width: 100,
    height: 100
};