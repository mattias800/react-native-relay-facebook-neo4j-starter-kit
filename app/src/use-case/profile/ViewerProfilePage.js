/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../common/util/RelayFactory";
import {routeConfigParamsBuilder} from "../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";

class ViewerProfilePage extends React.Component {

    render() {
        const {user} = this.props;

        return (
            <ScrollView style={{marginTop:20}}>
                <UserProfile user={actor}
                             isCurrentUser={true} />
            </ScrollView>
        );
    }

}

ViewerProfilePage = Relay.createContainer(ViewerProfilePage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                ${UserProfile.getFragment('user')}
            }
    `,
    },
});

export const ViewerProfilePageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <ViewerProfilePage user={props.viewer.actor} />,
        {
            fragments: {
                viewer: () => Relay.QL`
            fragment on Viewer {
                actor {
                    ${ViewerProfilePage.getFragment('user')}
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
            token: getAuthTokenUsedByRelay()
        },
        name: 'ViewerProfileRoute',
    })
);
