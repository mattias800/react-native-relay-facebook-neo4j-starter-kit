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
import {LogoutButton} from "../../session/LogoutButton";

class UserProfileComponent extends React.Component {

    render() {
        const {user, viewer} = this.props;
        const {firstName, lastName, email} = user;
        return (
            <View>
                <Text>UserProfile</Text>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
                <UserEmail user={user} />
                {
                    user.__dataID__ == viewer.__dataID__ && <LogoutButton />
                }
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
