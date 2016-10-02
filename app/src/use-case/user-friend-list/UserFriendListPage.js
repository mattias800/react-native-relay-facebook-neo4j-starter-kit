/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../common/util/RelayFactory";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";

class UserFriendListPage extends React.Component {

    render() {
        const {friends} = this.props;

        return (
            <ScrollView>
                <Text>UserFriendListPage</Text>
                <Text>{!actor && "actor is undefined"}</Text>
                <Text>{actor ? actor.email : "NO EMAIL"}</Text>
            </ScrollView>
        );
    }

}

UserFriendListPage = Relay.createContainer(UserFriendListPage, {
    fragments: {
        friends: () => Relay.QL`
            fragment on User {
                email
            }
    `,
    },
});

export const UserFriendListPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserFriendListPage user={props.viewer.user.friends}
                                     navigator={props.navigator} />,
        {
            fragments: {
                viewer: () => Relay.QL`
            fragment on Viewer {
                user(id: $userId) {
                    friends {
                        edges {
                            node {
                                ${UserFriendListPage.getFragment('user')}                            
                            }
                        }
                    }
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
                        viewer(token:$token) {
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
