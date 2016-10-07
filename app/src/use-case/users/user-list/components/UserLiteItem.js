/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {ListItem} from "react-native-elements";

class UserListItemComponent extends React.Component {

    render() {
        const {user} = this.props;
        console.log("------UserListItem");
        console.log(user);

        return (
            <ListItem roundAvatar
                      avatar={user.profilePhotoUrl}
                      title={`${user.firstName} ${user.lastName}`}
                      subtitle={user.email}
                      onPress={() => this.userPressed(user)} />
        );
    }

    userPressed(user) {
        console.log("click on user");
        console.log(user);

        this.props.navigator.push({
            screen: 'example.UserProfileScreen',
            title: `${user.firstName} ${user.lastName}`,
            passProps: {
                userId: user.id
            }
        });
    }

}

export const UserListItem = Relay.createContainer(UserListItemComponent, {
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
