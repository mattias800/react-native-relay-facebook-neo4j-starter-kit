/* @flow */

import React from "react";
import Relay from 'react-relay';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export class UserProfile extends React.Component {

    render() {
        const {firstName, lastName, email} = this.props.user;
        return (
            <View>
                <Text>UserProfile</Text>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
                <Text>{email}</Text>
                <Text>End of profile</Text>
            </View>
        );
    }

}

UserProfile = Relay.createContainer(UserProfile, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        firstName,
        lastName,
        email
      }
    `,
    },
});
