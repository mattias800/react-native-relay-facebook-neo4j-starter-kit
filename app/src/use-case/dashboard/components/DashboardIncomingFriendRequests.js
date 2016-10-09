/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";

class DashboardIncomingFriendRequestsComponent extends React.Component {

    render() {
        const {user, viewer} = this.props;
        return (
            <View>
                <Text>DashboardIncomingFriendRequests</Text>
            </View>
        );
    }

}

export const DashboardIncomingFriendRequests = Relay.createContainer(DashboardIncomingFriendRequestsComponent, {
    fragments: {
        user: () => Relay.QL`
        fragment on User {
            incomingFriendRequests {
                user {
                    firstName
                    lastName
                }
            }
        }
    `,
    },
});
