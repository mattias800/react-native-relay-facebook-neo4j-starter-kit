/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../../common/util/RelayFactory";
import {UserRegistration} from "./components/UserRegistration";
import {UpdateUserMutation} from "../../../mutations/users/UpdateUserMutation";
import {getCurrentUserId, getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";
import {ProgressOverlay} from "../../../common/ui/progress/ProgressOverlay";
import {showMainAppScreen} from "../../../bootstraps/MainBootstrap";
import {setProfileComplete} from "../../../system/SessionStorage";

class UserRegistrationPage extends React.Component {

    render() {
        const {user} = this.props;
        return (
            <View style={{flex:1}}>
                <UserRegistration user={user}
                                  onSubmit={(model) => this.submit(model) } />

                <ProgressOverlay show={this.state && this.state.saveInProgress}
                                 fail={this.state && this.state.saveFailed}
                                 success={this.state && this.state.saveSuccess}
                                 text={this.state && this.state.progressText} />
            </View>
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

        this.setState({
                          saveInProgress: true,
                          saveSuccess: false,
                          saveError: false,
                          progressText: "Saving your information..."
                      });

        let mutation = new UpdateUserMutation(data);
        this.props.relay.commitUpdate(mutation, {
            onSuccess: response => {
                this.setState({
                                  saveSuccess: true,
                                  progressText: null
                              });
                setProfileComplete(); // TODO Fetch this from backend instead?
                setTimeout(() => showMainAppScreen(), 3000);

                console.log("SUCCESS!");
                console.log(response);
            },
            onFailure: (transaction) => {
                this.setState({
                                  saveFailed: true,
                                  progressText: "Unable to save your information, please try again."
                              });

                setTimeout(() => this.setState({saveInProgress: false}), 3000);
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
                        viewer {
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
