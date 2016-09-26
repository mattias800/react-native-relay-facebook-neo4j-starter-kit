/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent} from "../../common/util/RelayFactory";
import {routeConfigParamsBuilder} from "../../common/util/RelayFactory";
import {UserRegistration} from "./components/UserRegistration";

class UserRegistrationPage extends React.Component {

    render() {
        const {actor} = this.props.user;

        console.log("this.props");
        console.log(this.props);

        console.log("actor");
        console.log(actor);

        return (
            <ScrollView>
                <UserRegistration user={actor} />
            </ScrollView>
        );
    }

}

UserRegistrationPage = Relay.createContainer(UserRegistrationPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on Viewer {
                actor {
                    ${UserRegistration.getFragment('user')}
                }
            }
    `,
    },
});

class QueryConfig extends Relay.Route {
    static routeName = 'UserRegistrationRoute';
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

export const UserRegistrationPageComponent = createRootRelayComponent(UserRegistrationPage, QueryConfig);


