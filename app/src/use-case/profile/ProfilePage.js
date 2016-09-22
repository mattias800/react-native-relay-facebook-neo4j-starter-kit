/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRootRelayComponent} from "../../common/util/RelayFactory";
import {routeConfigParamsBuilder} from "../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";

class ProfilePage extends React.Component {

    render() {
        const {actor} = this.props.user;

        return (
            <ScrollView style={{marginTop:20}}>
                <UserProfile user={actor}
                             viewer={actor} />
            </ScrollView>
        );
    }

}

ProfilePage = Relay.createContainer(ProfilePage, {
    fragments: {
        user: () => Relay.QL`
            fragment on Viewer {
                actor {
                    ${UserProfile.getFragment('user')}
                }
            }
    `,
    },
});

class QueryConfig extends Relay.Route {
    static routeName = 'ViewerProfileRoute';
    static prepareParams = routeConfigParamsBuilder;
    static queries = {
        user: (Component) =>
            Relay.QL`
                     query {
                        viewer(token:$token) {
                            ${Component.getFragment('user')}                                        
                        }
                     }
        `,
    };
}

export const ProfilePageComponent = createRootRelayComponent(ProfilePage, QueryConfig);


