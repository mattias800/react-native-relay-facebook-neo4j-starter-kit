/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../common/util/RelayFactory";
import {DashboardTop} from "./components/DashboardTop";
import {getAuthTokenUsedByRelay, getCurrentUserId} from "../../network/RelayNetworkConfig";
import {DashboardAnimalList} from "./components/DashboardAnimalList";
import {DashboardIncomingFriendRequests} from "./components/DashboardIncomingFriendRequests";

class DashboardPage extends React.Component {

    render() {
        const {user} = this.props;

        return (
            <ScrollView>
                <DashboardTop user={user} />
                <DashboardIncomingFriendRequests user={user} />
                <DashboardAnimalList user={user} />
            </ScrollView>
        );
    }

}

DashboardPage = Relay.createContainer(DashboardPage, {
    fragments: {
        user: (params) => Relay.QL`
            fragment on User {
                ${DashboardTop.getFragment('user', params)}
                ${DashboardAnimalList.getFragment('user', params)}
                ${DashboardIncomingFriendRequests.getFragment('user', params)}
            }
    `,
    },
});

export const DashboardPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <DashboardPage user={props.viewer.actor}
                                navigator={props.navigator} />,
        {
            fragments: {
                viewer: (params) => Relay.QL`
                    fragment on Viewer {
                        actor {
                            ${DashboardPage.getFragment('user', params)}
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
            currentUserId: getCurrentUserId()
        },
        name: 'UserFriendListRoute',
    })
);
