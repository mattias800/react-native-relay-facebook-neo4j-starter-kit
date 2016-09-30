/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {UserList} from "./components/UserList";
import {createRelayRenderer} from "../../common/util/RelayFactory";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";

class UserListPage extends React.Component {

    render() {
        console.log("this.props-.-------------------");
        console.log(this.props);
        const {navigator} = this.props;
        const {users} = this.props;

        return (
            <View style={{flex:1}}>
                <UserList users={users}
                          navigator={navigator} />
            </View>
        );
    }

}

UserListPage = Relay.createContainer(UserListPage, {
    fragments: {
        users: () => Relay.QL`
            fragment on User @relay(plural:true) {
                ${UserList.getFragment('users')}
            }
    `,
    },
});

export const UserListPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserListPage users={props.viewer.users}
                               navigator={props.navigator} />,
        {
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        users {
                            ${UserListPage.getFragment('users')}
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
            token: getAuthTokenUsedByRelay()
        },
        name: 'ViewerProfileRoute',
    })
);
