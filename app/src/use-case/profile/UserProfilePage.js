/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";
import {getAuthTokenUsedByRelay, getCurrentUserId} from "../../network/RelayNetworkConfig";

class UserProfilePage extends React.Component {

    render() {
        const {user} = this.props;
        const isCurrentUser = user.id === getCurrentUserId();

        return (
            <ScrollView style={{paddingTop:20, flex:1}}>
                <UserProfile user={user}
                             isCurrentUser={isCurrentUser} />
            </ScrollView>
        );
    }

}

UserProfilePage = Relay.createContainer(UserProfilePage, {
    fragments: {
        user: (params) => Relay.QL`
            fragment on User {
                id,
                ${UserProfile.getFragment('user', params)}
            }
    `,
    },
});

export const UserProfilePageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserProfilePage user={props.viewer.user}
                                  navigator={props.navigator} />,
        {
            initialVariables: {
                userId: null
            },
            fragments: {
                viewer: (params) => Relay.QL`
                    fragment on Viewer {
                        user(id: $userId) {
                            ${UserProfile.getFragment('user', params)}
                        }
                    }`,
            },
        }),

    props => {
        return ({
            queries: {
                viewer: (Component, params) =>
                    Relay.QL`
                     query {
                        viewer(token:$token) {
                            ${Component.getFragment('viewer', params)},
                        }
                     }
        `
            },
            params: {
                token: getAuthTokenUsedByRelay(),
                userId: props.userId
            },
            name: 'UserProfilePageRoute',
        });
    }
);
