/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../../common/util/RelayFactory";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";
import {List, ListItem} from "react-native-elements";

class UserFriendListPage extends React.Component {

    render() {
        const {user} = this.props;
        const friends = user.friends;

        return (
            <ScrollView>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        friends.edges && friends.edges.length
                            ? friends.edges
                            .map(edge => edge.node)
                            .map(friend => (
                                <ListItem roundAvatar
                                          key={friend.id}
                                          avatar={friend.profilePhotoUrl}
                                          title={`${friend.firstName} ${friend.lastName}`}
                                          subtitle={friend.email}
                                          onPress={() => this.userPressed(friend)} />
                            ))
                            : <Text>No friends</Text>
                    }
                </List>
            </ScrollView>
        );
    }

    userPressed(user) {
        this.props.navigator.push({
            screen: 'example.UserProfileScreen',
            title: `${user.firstName} ${user.lastName}`,
            passProps: {
                userId: user.id
            }
        });
    }

}

UserFriendListPage = Relay.createContainer(UserFriendListPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                friends(first:10) {
                    edges {
                        node {
                            id
                            email
                            firstName
                            lastName
                            profilePhotoUrl
                        }
                    }
                }
            }
    `,
    },
});

export const UserFriendListPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserFriendListPage user={props.viewer.user}
                                     navigator={props.navigator} />,
        {
            initialVariables: {
                userId: null
            },
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        user(id: $userId) {
                            ${UserFriendListPage.getFragment('user')}                            
                        }
                    }
                `,
            },
        }),

    props => ({
        queries: {
            viewer: (Component, params) =>
                Relay.QL`
                     query {
                        viewer {
                            ${Component.getFragment('viewer', params)},
                        }
                     }
        `,
        },
        params: {
            token: getAuthTokenUsedByRelay(),
            userId: props.userId
        },
        name: 'UserFriendListRoute',
    })
);
