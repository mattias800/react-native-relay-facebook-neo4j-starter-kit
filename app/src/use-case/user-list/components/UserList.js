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
                        console.log(users)
                    }
                    {
                        users.map((user, i) => (
                            <ListItem roundAvatar
                                      avatar={user.profilePhotoUrl}
                                      key={user.__dataID__}
                                      title={`${user.firstName} ${user.lastName}`}
                                      subtitle={user.email}
                                      onPress={() => this.userPressed(user)} />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

    userPressed(user) {
        console.log("click on user");
        console.log(user);

        this.props.navigator.push({
            screen: 'doggy.UserProfileScreen',
            title: `${user.firstName} ${user.lastName}`,
            passProps: {
                userId: user.id
            }
        });
    }

}

export const UserList = Relay.createContainer(UserListComponent, {
    fragments: {
        users: () => Relay.QL`
      fragment on User @relay(plural:true) {
        id,
        firstName,
        lastName,
        email,
        profilePhotoUrl
      }
    `,
    },
});
