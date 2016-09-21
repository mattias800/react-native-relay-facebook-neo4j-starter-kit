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
        const {user, viewer} = this.props;
        const {firstName, lastName} = user;
        return (
            <Column>
                <Row style={{height:75, marginTop:10}}
                     justifyContent="center">
                    <UserProfilePhoto user={user} />
                </Row>

                <Row justifyContent="center">
                    <Text style={nameTextStyle}>{`${firstName} ${lastName}`}</Text>
                </Row>
                <Row justifyContent="center">
                    <UserEmail user={user} />
                </Row>
                <Row justifyContent="center">
                    {
                        isSameEntity(user, viewer) && <LogoutButton />
                    }
                </Row>
            </Column>
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

const nameContainerStyle = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
};

const nameTextStyle = {
    fontSize: 18
};