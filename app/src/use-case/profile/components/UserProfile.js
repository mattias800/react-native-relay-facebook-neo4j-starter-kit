/* @flow */

import React from "react";
import Relay from 'react-relay';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {UserEmail} from "./UserEmail";

class UserProfileComponent extends React.Component {

    render() {
        const {user} = this.props;
        const {firstName, lastName, email} = user;
        return (
            <View>
                <Text>UserProfile</Text>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
                <UserEmail user={user} />
                <Text>End of profile</Text>
            </View>
        );
    }

}

export const UserProfile = Relay.createContainer(UserProfileComponent, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        firstName,
        lastName,
        ${UserEmail.getFragment('user')}
      }
    `,
    },
});
