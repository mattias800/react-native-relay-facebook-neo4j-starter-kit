/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent} from "../../common/util/RelayFactory";
import {getAuthTokenUsedByRelay, getCurrentUserId} from "../../network/RelayNetworkConfig";

class UsersAnimalsPage extends React.Component {

    render() {
        const {user} = this.props;

        return (
            <ScrollView>
                <Text>UsersAnimalsPage</Text>
                <Text>{!actor && "actor is undefined"}</Text>
                <Text>{actor ? actor.email : "NO EMAIL"}</Text>
            </ScrollView>
        );
    }

}

UsersAnimalsPage = Relay.createContainer(UsersAnimalsPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                email
            }
    `,
    },
});

export const UsersAnimalsPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UsersAnimalsPage user={props.viewer.actor}
                                   navigator={props.navigator} />,
        {
            fragments: {
                viewer: () => Relay.QL`
            fragment on Viewer {
                actor {
                    ${UsersAnimalsPage.getFragment('user')}
                }
            }
        `,
            },
        }),

    props => ({
        queries: {
            viewer: (Component) =>
                Relay.QL`
                     query {
                        viewer(token:$token) {
                            ${Component.getFragment('viewer')},
                        }
                     }
        `,
        },
        params: {
            token: getAuthTokenUsedByRelay(),
            currentUserId: getCurrentUserId()
        },
        name: 'UserFriendListRoute',
    })
);
