/* @flow */

import React from "react";
import Relay from 'react-relay';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {UserProfile} from "./components/UserProfile";
import {ViewerProfileQueryConfig} from "./routes/ViewerProfileQueryConfig";

class ViewerProfilePage extends React.Component {

    render() {
        const {firstName, lastName, email} = this.props.viewer;

        return (
            <View>
                <Text>ProfilePage</Text>
                <Text>Bjaa</Text>
                <Text>{email}</Text>
            </View>
        );
    }

}
/*

 viewer: () => Relay.QL`
 fragment on User {
 ${UserProfile.getFragment('user')}
 }
 `,
 */

ViewerProfilePage = Relay.createContainer(ViewerProfilePage, {
    fragments: {
        viewer: () => Relay.QL`
      fragment on User {
            firstName,
            lastName,
            email
       }
    `,
    },
});

export const ViewerProfilePageRoot = ({currentParams}) => {
    return (
        <Relay.Renderer
            environment={Relay.Store}
            Container={ViewerProfilePage}
            queryConfig={new ViewerProfileQueryConfig()}
        />
    )
};