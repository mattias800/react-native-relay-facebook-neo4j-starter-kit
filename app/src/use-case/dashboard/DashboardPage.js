/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../common/util/RelayFactory";
import {DashboardTop} from "./components/DashboardTop";
import {getCurrentUserId} from "../../network/RelayNetworkConfig";
import {DashboardAnimalList} from "./components/DashboardAnimalList";
import {DashboardIncomingFriendRequests} from "./components/DashboardIncomingFriendRequests";
import {FriendsComboBox} from "../../common/ui/friends-combobox/FriendsComboBox";

class DashboardPage extends React.Component {

    render() {
        const {user, actor, navigator} = this.props;

        return (
            <ScrollView>
                <FriendsComboBox actor={actor} />
                <DashboardTop user={user} />
                <DashboardIncomingFriendRequests user={user} />
                <DashboardAnimalList user={user}
                                     navigator={navigator} />
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
            }`,
        actor: (params) => Relay.QL`
            fragment on User {
                ${FriendsComboBox.getFragment('actor', params)}
            }`,
    },
});

export const DashboardPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <DashboardPage user={props.viewer.actor}
                                actor={props.viewer.actor}
                                navigator={props.navigator} />,
        {
            fragments: {
                viewer: (params) => Relay.QL`
                    fragment on Viewer {
                        actor {
                            ${DashboardPage.getFragment('user', params)}
                            ${DashboardPage.getFragment('actor', params)}
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
            currentUserId: getCurrentUserId()
        },
        name: 'UserFriendListRoute',
    })
);
