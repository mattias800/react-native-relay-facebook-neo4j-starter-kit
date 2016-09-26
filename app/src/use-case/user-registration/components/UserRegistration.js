/* @flow */

import React from "react";
import Relay from 'react-relay';
import {FormLabel, FormInput} from 'react-native-elements'


import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MainContent from "../../../common/ui/MainContent";

class UserRegistrationComponent extends React.Component {

    render() {
        const {user} = this.props;
        const {id, firstName, lastName, email, profilePhotoUrl} = user;

        return (
            <MainContent>
                <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingTop:20, paddingBottom:20}}>
                    <Text style={{fontSize:28, paddingBottom:20}}>Welcome!</Text>
                    <Text>Please fill out these details before we continue.</Text>
                </View>
                <FormLabel>E-mail</FormLabel>
                <FormInput onChangeText={(t) => console.log("text=" + t)}
                           placeholder="Please enter your e-mail..."
                           defaultValue={email} />
                <FormLabel>First name</FormLabel>
                <FormInput onChangeText={(t) => console.log("text=" + t)}
                           placeholder="Please enter your first name..."
                           defaultValue={firstName} />
                <FormLabel>Last name</FormLabel>
                <FormInput onChangeText={(t) => console.log("text=" + t)}
                           placeholder="Please enter your last name..."
                           defaultValue={lastName} />
            </MainContent>
        );
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
