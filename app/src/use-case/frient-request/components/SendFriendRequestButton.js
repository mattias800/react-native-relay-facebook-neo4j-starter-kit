/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import Button from "react-native-elements/src/buttons/Button";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";
import {CreateFriendRequestMutation} from "../../../mutations/friend-requests/CreateFriendRequestMutation";

class SendFriendRequestButtonComponent extends React.Component {

    render() {
        const {user, actor} = this.props;
        const {progress} = this.state || {};

        return (
            progress ?
                <View><ActivityIndicator /></View>
                :
                <Button small
                        backgroundColor="#abe"
                        title='Send friend request'
                        onPress={() => this.onSubmit()} />
        );
    }

    onSubmit() {
        const {user, actor, relay} = this.props;

        this.setState({progress: true});

        const mutation = new CreateFriendRequestMutation({
            token: getAuthTokenUsedByRelay(),
            actor,
            user
        });
        relay.commitUpdate(mutation, {
            onSuccess(response) {


            },
            onFailure(transaction) {

            }
        });
    }

}

export const SendFriendRequestButton = Relay.createContainer(SendFriendRequestButtonComponent, {
    fragments: {
        user: (params) => Relay.QL`
            fragment on User {
                id
                firstName
                lastName
                ${CreateFriendRequestMutation.getFragment('user', params)}
            }
    `,
        actor: (params) => Relay.QL`
            fragment on User {
                ${CreateFriendRequestMutation.getFragment('actor', params)}
            }
    `,
    },
});
