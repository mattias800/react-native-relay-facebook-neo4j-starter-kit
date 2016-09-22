/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRootRelayComponent} from "../../common/util/RelayFactory";
import {routeConfigParamsBuilder} from "../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";

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

class QueryConfig extends Relay.Route {
    static routeName = 'ViewerProfileRoute';
    static paramDefinitions = {
        userId: {required: true},
    };
    static prepareParams = routeConfigParamsBuilder;
    static queries = {
        user: (Component, vars) =>
            Relay.QL`
                     query {
                        viewer(token:$token) {
                            ${Component.getFragment('user', vars)}
                        }
                     }
        `,
    };
}

export const ProfilePageComponent = createRootRelayComponent(ProfilePage, QueryConfig, props => ({userId: props.userId}));


