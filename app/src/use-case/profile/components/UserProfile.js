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
import {UserProfilePhoto} from "./UserProfilePhoto";
import {Row} from "../../../common/ui/Row";
import {Column} from "../../../common/ui/Column";

class UserProfileComponent extends React.Component {

    render() {
        const {user, isCurrentUser} = this.props;
        console.log("isCurrentUser");
        console.log(isCurrentUser);

        const {firstName, lastName} = user;
        return (
            <View style={containerStyle}>
                <UserProfilePhoto user={user} />
                <Text style={nameTextStyle}>{`${firstName} ${lastName}`}</Text>
                <UserEmail user={user} />
                {
                    isCurrentUser && <LogoutButton />
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
        ${UserProfilePhoto.getFragment('user')},
        ${UserEmail.getFragment('user')}
      }
    `,
    },
});

const containerStyle = {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
};

const nameContainerStyle = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
};

const nameTextStyle = {
    fontSize: 18
};