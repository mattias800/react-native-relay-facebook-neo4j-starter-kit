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
import {isSameEntity} from "../../../common/util/EntityUtil";

class UserProfileComponent extends React.Component {

    render() {
        const {user, viewer} = this.props;
        const {firstName, lastName, email} = user;
        return (
            <View>
                <Text>UserProfile</Text>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
                {
                    isSameEntity(user, viewer) && <LogoutButton />
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
        lastName
      }
    `,
    },
});
