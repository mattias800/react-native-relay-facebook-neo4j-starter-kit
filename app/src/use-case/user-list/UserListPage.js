/* @flow */

import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {UserList} from "./components/UserList";
import {routeConfigParamsBuilder, createRootRelayComponent} from "../../common/util/RelayFactory";

class UserListPage extends React.Component {

    render() {
        console.log("this.props.users");
        console.log(this.props.users);

        const {users} = this.props.users;

        return (
            <View>
                <UserList users={users} />
            </View>
        );
    }

}

UserListPage = Relay.createContainer(UserListPage, {
    fragments: {
        users: () => Relay.QL`
      fragment on Viewer {
          users {
             ${UserList.getFragment('users')}
          }
       }
    `,
    },
});

class QueryConfig extends Relay.Route {
    static routeName = 'UsersListRoute';
    static prepareParams = routeConfigParamsBuilder;
    static queries = {
        users: (Component) =>
            Relay.QL`
                     query {
                        viewer(token:$token) {
                            ${Component.getFragment('users')}                                        
                        }
                     }
        `,
    };
}

export const UserListPageComponent = createRootRelayComponent(UserListPage, QueryConfig);


