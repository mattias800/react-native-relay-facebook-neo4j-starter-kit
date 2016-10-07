/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";

class UserEmailComponent extends React.Component {

    render() {
        const {email} = this.props.user;
        return (
            <View style={emailContainerStyle}>
                <Text style={emailTextStyle}>{email}</Text>
            </View>
        );
    }

}

export const UserEmail = Relay.createContainer(UserEmailComponent, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        email
      }
    `,
    },
});

const emailContainerStyle = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
};

const emailTextStyle = {
    fontSize: 12
};