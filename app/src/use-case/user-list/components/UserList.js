/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {List} from "react-native-elements";
import {UserListItem} from "./UserLiteItem";

class UserListComponent extends React.Component {

    render() {

        const {users} = this.props;
        return (
            <ScrollView>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        users.map((edge, i) => (<UserListItem user={edge.node} />))
                    }
                </List>
            </ScrollView>
        );
    }

}

export const UserList = Relay.createContainer(UserListComponent, {
    fragments: {
        users: () => Relay.QL`
        fragment on User @relay(plural:true) {
            ${UserListItem.getFragment('user')}
        }
    `,
    },
});
