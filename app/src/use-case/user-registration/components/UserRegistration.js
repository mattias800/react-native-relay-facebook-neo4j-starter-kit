/* @flow */

import React from "react";
import Relay from 'react-relay';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class UserRegistrationComponent extends React.Component {

    render() {
        const {user} = this.props;
        const {id, firstName, lastName, email, profilePhotoUrl} = user;

        return (
            <View>
                <Text>UserRegistration</Text>
                <Text>{email}</Text>
            </View>
        );
    }

}

export const UserRegistration = Relay.createContainer(UserRegistrationComponent, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        id,
        firstName,
        lastName,
        email,
        profilePhotoUrl
      }
    `,
    },
});
