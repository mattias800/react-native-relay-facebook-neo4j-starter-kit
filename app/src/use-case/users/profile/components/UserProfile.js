/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {UserEmail} from "./UserEmail";
import {LogoutButton} from "../../../session/LogoutButton";
import {UserProfilePhoto} from "./UserProfilePhoto";
import {FriendRequestText} from "../../../frient-request/components/FriendRequestText";

class UserProfileComponent extends React.Component {

    render() {

        const {user, actor} = this.props;
        return (
            <View style={containerStyle}>
                <UserProfilePhoto user={user} />
                <Text onPress={() => this.goToFriends()}>{user.numFriends} friends</Text>
                <Text onPress={() => this.goToAnimals()}>{user.numAnimals} animals</Text>
                <UserEmail user={user} />
                {
                    !user.isCurrentUser &&
                    <View>
                        <Text>{user.isFriend ? "Is friend" : "Not friend"}</Text>
                        <FriendRequestText user={user}
                                           actor={actor} />
                    </View>
                }

                {
                    user.isCurrentUser && <LogoutButton />
                }
            </View>
        );
    }

    goToAnimals() {
        const {user} = this.props;
        this.props.navigator.push(
            {
                screen: 'example.UserProfileAnimalsScreen',
                title: `${user.firstName}s dogs`,
                passProps: {
                    userId: user.id
                }
            });
    }

    goToFriends() {
        const {user} = this.props;
        this.props.navigator.push(
            {
                screen: 'example.UserProfileFriendsScreen',
                title: `${user.firstName}s friends`,
                passProps: {
                    userId: user.id
                }
            });
    }

}

export const UserProfile = Relay.createContainer(UserProfileComponent, {
    fragments: {
        user: (params) => Relay.QL`
        fragment on User {
            id
            firstName
            lastName
            numFriends
            numAnimals
            isCurrentUser
            isFriend
            ${FriendRequestText.getFragment('user', params)}
            ${UserProfilePhoto.getFragment('user', params)}
            ${UserEmail.getFragment('user', params)}
        }
    `,
        actor: (params) => Relay.QL`
        fragment on User {
            ${FriendRequestText.getFragment('actor', params)}
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