/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Image, Text, View} from "react-native";
import {Row} from "../../../common/ui/Row";
import {UserProfilePhoto} from "../../users/profile/components/UserProfilePhoto";

class DashboardTopComponent extends React.Component {

    render() {
        const {user} = this.props;
        const {firstName, lastName, profilePhotoUrl} = user;
        return (
            <Row>
                <UserProfilePhoto user={user}
                                  style={profilePhotoStyle} />
                <View style={{padding:10}}>
                    <Text>Welcome back {firstName}!</Text>
                </View>
            </Row>
        );
    }

}

export const DashboardTop = Relay.createContainer(DashboardTopComponent, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                firstName
                lastName
                ${UserProfilePhoto.getFragment('user')}
            }
    `,
    },
});

const profilePhotoStyle = {
    width: 100,
    height: 100
};