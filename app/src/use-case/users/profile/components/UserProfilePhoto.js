/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, Image} from "react-native";
import {Icon} from "react-native-elements";

class UserProfilePhotoComponent extends React.Component {

    render() {
        const {user, width, height, style} = this.props;
        return (
            user.profilePhotoUrl
                ?
                <Image style={{...imageStyle, ...style}}
                       source={{uri: user.profilePhotoUrl}} />
                :
                <View style={{...iconStyle, ...style}}>
                    <Icon name='user'
                          type='font-awesome'
                          size={46}
                          color="#ccc" />
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

const imageStyle = {
    height: 100,
    borderRadius: 50,
    width: 100
};

const iconStyle = {
    height: 100,
    width: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc"
};