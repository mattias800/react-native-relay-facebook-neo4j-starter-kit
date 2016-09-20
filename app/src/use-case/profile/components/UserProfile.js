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
        const {firstName, lastName} = user;
        return (
            <View>
                <View style={nameContainerStyle}>
                    <Text style={nameTextStyle}>{`${firstName} ${lastName}`}</Text>
                </View>
                <UserEmail user={user} />
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
        lastName,
        ${UserEmail.getFragment('user')}
      }
    `,
    },
});

const nameContainerStyle = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
};

const nameTextStyle = {
    fontSize: 18
};