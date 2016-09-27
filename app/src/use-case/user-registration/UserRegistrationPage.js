/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {routeConfigParamsBuilder} from "../../common/util/RelayFactory";
import {UserRegistration} from "./components/UserRegistration";
import {UpdateUserMutation} from "../../mutations/users/UpdateUserMutation";
import {addToken} from "../../network/RelayNetworkConfig";
import {getCurrentUserId} from "../../network/RelayNetworkConfig";
import {createRootRelayComponent} from "../../common/util/RelayFactory";

class UserRegistrationPage extends React.Component {

    render() {
        const user = this.props.user;
        return (
            <UserRegistration user={user}
                              onSubmit={(model) => this.submit(model) } />
        );
    }

    submit(model) {
        const user = this.props.user;
        console.log("submit user");
        console.log(user);

        var data = {
            user,
            id: user.id,
            ...model
        };
        console.log("data");
        console.log(data);

        this.props.relay.commitUpdate(
            new UpdateUserMutation(data, {
                onSuccess: response => {
                    console.log("SUCCESS!");
                    console.log(response);
                },
                onFailure: () => {
                    console.log("FAIL!");
                }
            }));
    }

}

UserRegistrationPage = Relay.createContainer(UserRegistrationPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                ${UserRegistration.getFragment('user')},
                ${UpdateUserMutation.getFragment('user')}
            }
        `,
    },
});

//////////////////////////////

class UserRegistrationViewer extends React.Component {

    render() {
        return <UserRegistrationPage user={this.props.viewer.actor} />
    }

}

UserRegistrationViewer = Relay.createContainer(UserRegistrationViewer, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                actor {
                    ${UserRegistrationPage.getFragment('user')},
                }
            }
        `,
    },
});

/////////////////////////////////

class QueryConfig extends Relay.Route {
    static routeName = 'UserRegistrationRoute';
    static prepareParams = routeConfigParamsBuilder;
    static queries = {
        viewer: (Component) =>
            Relay.QL`
                     query {
                        viewer(token:$token) {
                            ${Component.getFragment('viewer')},
                        }
                     }
        `,
    };
}

export const UserRegistrationPageComponent = createRootRelayComponent(UserRegistrationViewer, QueryConfig);
