/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {RespondToFriendRequestMutation} from "../../../mutations/friend-requests/RespondToFriendRequestMutation";

class FriendRequestRespondButtonComponent extends React.Component {

    render() {
        const {user, actor} = this.props;
        return (
            <View>
                <Text>RESPOND</Text>
            </View>
        );
    }

    respondToRequest(accepted, declined, ignored) {
        const {user, actor} = this.props;
        const mutation = new RespondToFriendRequestMutation({
            accepted,
            declined,
            ignored,
            sender: user,
            receiver: actor
        });
    }

}

export const FriendRequestRespondButton = Relay.createContainer(FriendRequestRespondButtonComponent, {
    fragments: {
        user: (params) => Relay.QL`
        fragment on User {
            id
            firstName
        }
    `,
        actor: (params) => Relay.QL`
        fragment on User {
            id
        }
    `,
    },
});
