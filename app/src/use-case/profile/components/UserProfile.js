/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {UserEmail} from "./UserEmail";
import {LogoutButton} from "../../session/LogoutButton";
import {UserProfilePhoto} from "./UserProfilePhoto";

class UserProfileComponent extends React.Component {

    render() {
        const {user, isCurrentUser} = this.props;
        console.log("isCurrentUser");
        console.log(isCurrentUser);

        const {firstName, lastName} = user;
        return (
            <View style={containerStyle}>
                <UserProfilePhoto user={user} />
                <Text style={nameTextStyle}>{`${firstName || ""} ${lastName || ""}`}</Text>
                <Text>{user.numFriends} friends</Text>
                <Text onPress={() => this.goToAnimals()}>{user.numAnimals} animals</Text>
                <UserEmail user={user} />
                {
                    isCurrentUser && <LogoutButton />
                }
            </View>
        );
    }

    goToAnimals() {
        const {user} = this.props;

        console.log("this.props");
        console.log(this.props);
        console.log("------user.idcl");
        console.log(user.id);


        this.props.navigator.push({
            screen: 'example.UserProfileAnimalsScreen',
            title: `${user.firstName}s dogs`,
            passProps: {
                userId: user.id
            }
        });
    }

}

export const UserProfile = Relay.createContainer(UserProfileComponent, {
    fragments: {
        user: () => Relay.QL`
        fragment on User {
            id
            firstName
            lastName
            numFriends
            numAnimals
            ${UserProfilePhoto.getFragment('user')}
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