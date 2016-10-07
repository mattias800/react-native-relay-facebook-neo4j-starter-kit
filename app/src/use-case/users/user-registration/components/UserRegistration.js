/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import MainContent from "../../../../common/ui/MainContent";
import {UserRegistrationForm} from "./UserRegistrationForm";

class UserRegistrationComponent extends React.Component {

    render() {
        const {user, onSubmit} = this.props;
        const {id, firstName, lastName, email, profilePhotoUrl} = user;

        return (
            <MainContent>
                <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingTop:20, paddingBottom:20}}>
                    <Text style={{fontSize:28, paddingBottom:20}}>Welcome!</Text>
                    <Text>Please fill out these details before we continue.</Text>
                </View>
                <UserRegistrationForm user={user}
                                      onSubmit={(model) => onSubmit(model)} />
            </MainContent>
        );
    }

    submit() {
        console.log("Submittis");
    }

}

export const UserRegistration = Relay.createContainer(UserRegistrationComponent, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                id,
                firstName,
                lastName,
                email,
                profilePhotoUrl
            }
    `,
    },
});
