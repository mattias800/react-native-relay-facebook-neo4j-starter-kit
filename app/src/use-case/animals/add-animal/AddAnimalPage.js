/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../../common/util/RelayFactory";
import {getAuthTokenUsedByRelay, getCurrentUserId} from "../../../network/RelayNetworkConfig";
import {NewAnimalForm} from "./components/NewAnimalForm";
import {CreateAnimalMutation} from "../../../mutations/animals/CreateAnimalMutation";

class AddAnimalPage extends React.Component {

    render() {
        const {user} = this.props;

        return (
            <ScrollView>
                <NewAnimalForm onSubmit={model => this.onSubmit(model)} />
            </ScrollView>
        );
    }

    onSubmit(model) {
        const {user, relay, navigator} = this.props;

        const mutation = new CreateAnimalMutation({
            user,
            token: getAuthTokenUsedByRelay(),
            ...model
        });
        relay.commitUpdate(mutation, {
            onSuccess: response => {
            },
            onFailure: transaction => {
                alert("Could not save dog. Please try again.");
                console.log("FAILED!");
                console.log(transaction.getError());

            }
        });
        this.props.navigator.pop({animated: true});
    }

}

AddAnimalPage = Relay.createContainer(AddAnimalPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                email
                ${CreateAnimalMutation.getFragment('user')}
            }
    `,
    },
});

export const AddAnimalPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <AddAnimalPage user={props.viewer.actor}
                                navigator={props.navigator} />,
        {
            initialVariables: {
                userId: null
            },
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        actor {
                            ${AddAnimalPage.getFragment('user')}
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

AddAnimalPageComponent.PageTitle = "Add dog";
