/* @flow */

import React from "react";
import Relay from 'react-relay';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

class UserProfilePhotoComponent extends React.Component {

    render() {
        const {user} = this.props;
        return (
            <View style={containerStyle}>
                <Image style={styles.image}
                       source={{uri: user.profilePhotoUrl}} />
            </View>
        );
    }

}

export const UserProfilePhoto = Relay.createContainer(UserProfilePhotoComponent, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        profilePhotoUrl
      }
    `,
    },
});

const containerStyle = {
    width: 100,
    height: 100
};

var styles = StyleSheet.create({
    image: {
        height: 100,
        borderRadius: 50,
        width: 100
    }
});