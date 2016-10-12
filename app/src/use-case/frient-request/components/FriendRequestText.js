/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {FriendRequestRespondButton} from "./FriendRequestRespondButton";

class FriendRequestTextComponent extends React.Component {

    render() {
        const {user, actor} = this.props;
        const {sent, received} = user.friendRequests;

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
            return null;
        }
    }

}

export const FriendRequestText = Relay.createContainer(FriendRequestTextComponent, {
    fragments: {
        user: (params) => Relay.QL`
            fragment on User {
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
            }
    `,
        actor: (params) => Relay.QL`
            fragment on User {
                ${FriendRequestRespondButton.getFragment('actor', params)}
            }
    `,
    },
});
