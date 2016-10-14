/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import * as SessionStorage from "../../../../system/SessionStorage";
import {reloadApplication} from "../../../../common/system/ApplicationReloader";

class LoginAsUserButtonComponent extends React.Component {

    render() {
        const {user} = this.props;
        if (user.isCurrentUser) {
            return null;
        } else {
            return (
                <Button backgroundColor="#abe"
                        icon={{name: 'check',  type: 'font-awesome'}}
                        title={`Login as ${user.firstName}`}
                        onPress={() => this.loginAsUser()} />
            );
        }
    }

    loginAsUser() {
        const {user} = this.props;
        const mockedServerResponse = {user, isCompleteProfile: true};
        SessionStorage.setSession(mockedServerResponse)
                      .then(() => {
                          reloadApplication();
                      });
    }

}

export const LoginAsUserButton = Relay.createContainer(LoginAsUserButtonComponent, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                token
                firstName
                isCurrentUser
            }
    `,
    },
});
