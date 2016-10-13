/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, Alert} from "react-native";
import {SectionHeader} from "../../../common/ui/SectionHeader";

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
            [
                {text: 'Accept', onPress: () => console.log('Ask me later pressed')},
                {text: 'Decline', onPress: () => console.log('Cancel Pressed')},
                {text: 'Ignore', onPress: () => console.log('OK Pressed')},
                {text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ]
        )
    }

}

export const DashboardIncomingFriendRequests = Relay.createContainer(DashboardIncomingFriendRequestsComponent, {
    fragments: {
        user: () => Relay.QL`
        fragment on User {
            activeIncomingFriendRequests {
                id
                sender {
                    firstName
                    lastName
                }
            }
        }
    `,
    },
});
