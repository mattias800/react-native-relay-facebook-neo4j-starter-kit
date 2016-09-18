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

class ViewerProfilePageComponent extends React.Component {

    render() {
        const {viewer} = this.props;

        return (
            <View>
                <Text>ProfilePage</Text>
                <UserProfile user={viewer}
                             viewer={viewer} />
            </View>
        );
    }

}

export const ViewerProfilePage = Relay.createContainer(ViewerProfilePageComponent, {
    fragments: {
        viewer: () => Relay.QL`
      fragment on User {
             ${UserProfile.getFragment('user')}
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