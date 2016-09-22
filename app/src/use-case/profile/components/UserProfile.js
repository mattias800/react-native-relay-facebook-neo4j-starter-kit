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
                <Column justifyContent="center"
                        alignItems="center">
                    <UserProfilePhoto user={user} />
                </Column>

                <Row justifyContent="center">
                    <Text style={nameTextStyle}>{`${firstName} ${lastName}`}</Text>
                </Row>
                <Row justifyContent="center">
                    <UserEmail user={user} />
                </Row>
                <Row justifyContent="center">
                    {
                        isCurrentUser && <LogoutButton />
                    }
                </Row>
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
    backgroundColor: "red",
    flex: 1
};

const nameContainerStyle = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
};

const nameTextStyle = {
    fontSize: 18
};