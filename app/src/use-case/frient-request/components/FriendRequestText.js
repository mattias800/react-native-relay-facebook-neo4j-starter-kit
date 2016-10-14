/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {FriendRequestRespondButton} from "./FriendRequestRespondButton";
import {SendFriendRequestButton} from "./SendFriendRequestButton";

class FriendRequestTextComponent extends React.Component {

    render() {
        const {user, actor} = this.props;
        const {sent, received} = user.friendRequests;

        if (user.id === actor.id) {
            return null;
        }

        if (sent) {
            return (
                <View>
                    <Text>Awaiting response</Text>
                </View>
            );
        } else if (received) {
            return (
                <View>
                    <Text>{user.firstName} wants to be your friend.</Text>
                    <FriendRequestRespondButton user={user}
                                                actor={actor} />
                </View>
            );
        } else {

            return (
                <SendFriendRequestButton user={user}
                                         actor={actor} />
            );
        }
    }

}

export const FriendRequestText = Relay.createContainer(FriendRequestTextComponent, {
    fragments: {
        user: (params) => Relay.QL`
            fragment on User {
                id
                firstName
                friendRequests {
                    sent {
                        declined
                        accepted
                        ignored
                    }
                    received {
                        declined
                        accepted
                        ignored
                    }
                }
                ${FriendRequestRespondButton.getFragment('user', params)}
                ${SendFriendRequestButton.getFragment('user', params)}
            }`,
        actor: (params) => Relay.QL`
            fragment on User {
                id
                ${FriendRequestRespondButton.getFragment('actor', params)}
                ${SendFriendRequestButton.getFragment('actor', params)}
            }`,
    },
});
