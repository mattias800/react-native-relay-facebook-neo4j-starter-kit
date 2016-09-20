/* @flow */

import React from "react";
import Relay from 'react-relay';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import {List, ListItem} from 'react-native-elements'

class UserListComponent extends React.Component {

    render() {
        const {users} = this.props;
        console.log("users");
        console.log(users);

        return (
            <ScrollView>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        users.map((user, i) => (
                            <ListItem
                                roundAvatar
                                avatar={user.avatar_url}
                                key={user.__dataID__}
                                title={`${user.firstName} ${user.lastName}`}
                                subtitle={user.email}
                            />
                        ))
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
        firstName,
        lastName,
        email
      }
    `,
    },
});
