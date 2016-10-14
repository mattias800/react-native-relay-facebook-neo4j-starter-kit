/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";

class UserProfilePage extends React.Component {

    render() {
        const {user, actor, navigator} = this.props;
        const {firstName, lastName} = user;

        navigator.setTitle({title: `${firstName} ${lastName}`});

        return (
            <ScrollView style={{paddingTop:20, flex:1}}>
                <UserProfile user={user}
                             actor={actor}
                             navigator={navigator} />
            </ScrollView>
        );
    }

}

UserProfilePage = Relay.createContainer(UserProfilePage, {
    fragments: {
        user: (params) => Relay.QL`
            fragment on User {
                id
                firstName
                lastName
                ${UserProfile.getFragment('user', params)}
            }
    `,
        actor: (params) => Relay.QL`
            fragment on User {
                ${UserProfile.getFragment('actor', params)}
            }
    `,
    },
});

export const UserProfilePageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserProfilePage user={props.viewer.user}
                                  actor={props.viewer.actor}
                                  navigator={props.navigator} />,
        {
            initialVariables: {
                userId: null
            },
            fragments: {
                viewer: (params) => Relay.QL`
                    fragment on Viewer {
                        user(id: $userId) {
                            ${UserProfilePage.getFragment('user', params)}
                        }
                        actor {
                            ${UserProfilePage.getFragment('actor', params)}
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
                        viewer {
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
