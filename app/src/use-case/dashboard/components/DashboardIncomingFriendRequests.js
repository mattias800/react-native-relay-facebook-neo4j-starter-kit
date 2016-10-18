/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, Alert} from "react-native";
import {SectionHeader} from "../../../common/ui/SectionHeader";
import {createButtons} from "./FriendRequestResponseButtons";
import {AcceptFriendRequestMutation} from "../../../mutations/friend-requests/AcceptFriendRequestMutation";
import {IgnoreFriendRequestMutation} from "../../../mutations/friend-requests/IgnoreFriendRequestMutation";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";

class DashboardIncomingFriendRequestsComponent extends React.Component {

    render() {
        const {user} = this.props;
        const {activeIncomingFriendRequests} = user;

        if (activeIncomingFriendRequests && activeIncomingFriendRequests.length) {
            return (
                <View>
                    <SectionHeader label="You have pending friend requests" />
                    {
                        activeIncomingFriendRequests
                            .map(request => (
                                <View key={request.id}>
                                    <Text onPress={() => this.clickOnFriendRequest(request)}>{request.sender.firstName} {request.sender.lastName}</Text>
                                </View>
                            ))
                    }

                </View>
            );
        } else {
            return null;
        }
    }

    clickOnFriendRequest(request) {
        Alert.alert(
            'Friend request',
            `${request.sender.firstName} wants to be your friend!`,
            createButtons(() => this.ignoreFriendRequest(request),
                          () => this.acceptFriendRequest(request)
            )
        )
    }

    ignoreFriendRequest(request) {
        const {relay} = this.props;
        const actor = this.props.user;
        const user = request.sender;
        const token = getAuthTokenUsedByRelay();
        let payload = {user, actor, token};
        relay.commitUpdate(new IgnoreFriendRequestMutation(payload), {
            onFailure: (transaction) => {
                alert("Could not ignore friend request. Please try again.");
                console.log(transaction.getError());
            }
        });
    }

    acceptFriendRequest(request) {
        const {relay} = this.props;
        const actor = this.props.user;
        const user = request.sender;
        const token = getAuthTokenUsedByRelay();
        let payload = {user, actor, token};
        relay.commitUpdate(new AcceptFriendRequestMutation(payload), {
            onFailure: (transaction) => {
                alert("Could not accept friend request. Please try again.");
                console.log(transaction.getError());
            }
        });
    }

}

export const DashboardIncomingFriendRequests = Relay.createContainer(DashboardIncomingFriendRequestsComponent, {
    fragments: {
        user: () => Relay.QL`
        fragment on User {
            activeIncomingFriendRequests {
                id
                sender {
                    id
                    firstName
                    lastName
                    ${IgnoreFriendRequestMutation.getFragment('user')}
                    ${AcceptFriendRequestMutation.getFragment('user')}
                }
            }
            ${IgnoreFriendRequestMutation.getFragment('actor')}
            ${AcceptFriendRequestMutation.getFragment('actor')}
        }
    `,
    },
});
