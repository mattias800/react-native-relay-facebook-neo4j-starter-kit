/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../common/util/RelayFactory";
import {routeConfigParamsBuilder} from "../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";

class ProfilePage extends React.Component {

    render() {
        const {userId, currentUserId} = this.props;
        const {user} = this.props.user;
        const isCurrentUser = userId === currentUserId;

        return (
            <ScrollView style={{paddingTop:20, flex:1}}>
                <UserProfile user={user}
                             isCurrentUser={isCurrentUser} />
            </ScrollView>
        );
    }

}

ProfilePage = Relay.createContainer(ProfilePage, {
    initialVariables: {
        userId: ''
    },
    prepareVariables: prevVariables => {
        console.log("ProfilePage.prepareVariables");
        console.log(prevVariables);
        return {
            ...prevVariables,
        };
    },
    fragments: {
        user: () => Relay.QL`
            fragment on Viewer {
                user(id: $userId) {
                    ${UserProfile.getFragment('user')}
                }
            }
    `,
    },
});

export const ProfilePageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <ProfilePage user={props.viewer.user} />,
        {
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        user(id: $userId) {
                            ${UserProfile.getFragment('user')}
                        }
                    }`,
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
            userId: props.userId
        },
        name: 'ProfilePageRoute',
    })
);
