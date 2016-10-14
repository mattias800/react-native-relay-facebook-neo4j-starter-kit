/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {AcceptFriendRequestMutation} from "../../../mutations/friend-requests/AcceptFriendRequestMutation";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";
import {IgnoreFriendRequestMutation} from "../../../mutations/friend-requests/IgnoreFriendRequestMutation";

class FriendRequestRespondButtonComponent extends React.Component {

    render() {
        const {user, actor} = this.props;
        return (
            <View>
                <Text>RESPOND</Text>
            </View>
        );
    }

    acceptFriendRequest() {
        const {user, actor} = this.props;
        const mutation = new AcceptFriendRequestMutation({
            token: getAuthTokenUsedByRelay(),
            user
        });
    }

    ignoreFriendRequest() {
        const {user, actor} = this.props;
        const mutation = new IgnoreFriendRequestMutation({
            token: getAuthTokenUsedByRelay(),
            user
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
