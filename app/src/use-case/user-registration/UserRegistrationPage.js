/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../common/util/RelayFactory";
import {UserRegistration} from "./components/UserRegistration";
import {UpdateUserMutation} from "../../mutations/users/UpdateUserMutation";
import {getCurrentUserId, getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";

class UserRegistrationPage extends React.Component {

    render() {
        const {user} = this.props;
        console.log("user.-----------------");
        console.log(user);
        console.log(user.id);
        console.log(user.firstName);
        console.log(user.lastName);

        return (
            <UserRegistration user={user}
                              onSubmit={(model) => this.submit(model) } />
        );
    }

    submit(model) {
        const {user} = this.props;
        console.log("submit user");
        console.log(user);
        // Silvie Deluxe

        var data = {
            token: getAuthTokenUsedByRelay(),
            user: user,
            ...model
        };
        console.log("data");
        console.log(data);


        let mutation = new UpdateUserMutation(data);
        this.props.relay.commitUpdate(mutation, {
            onSuccess: response => {
                console.log("SUCCESS!");
                console.log(response);
            },
            onFailure: (transaction) => {
                console.log("FAIL!");
                console.log(transaction.getError());

            }
        });
    }

}

UserRegistrationPage = Relay.createContainer(UserRegistrationPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                id,
                ${UserRegistration.getFragment('user')},
                ${UpdateUserMutation.getFragment('user')}
            }
        `,
    },
});

export const UserRegistrationPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserRegistrationPage user={props.viewer.actor} />,
        {
            fragments: {
                viewer: () => Relay.QL`
            fragment on Viewer {
                actor {
                    ${UserRegistrationPage.getFragment('user')}
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
            token: getAuthTokenUsedByRelay(),
            currentUserId: getCurrentUserId()
        },
        name: 'UserRegistrationRoute',
    })
);
