/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../../common/util/RelayFactory";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";
import {List} from "react-native-elements";
import {UserListItem} from "./components/UserLiteItem";
import {LINK_COLOR} from "../../../common/ui/colors/AppColors";

const PAGE_SIZE = 2;

class UserListPage extends React.Component {

    render() {
        const {navigator, viewer} = this.props;
        const users = viewer.users;
        const hasNextPage = viewer.users.pageInfo.hasNextPage;
        return (
            <ScrollView style={{flex:1}}>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        users.edges.map(edge => <UserListItem key={edge.node.id}
                                                              navigator={navigator}
                                                              user={edge.node} />)
                    }
                </List>
                {
                    hasNextPage &&
                    <View alignItems="center">
                        <Text onPress={() => this.showMore()}
                              style={{color:LINK_COLOR}}>Show more</Text>
                    </View>
                }
            </ScrollView>

        );
    }

    showMore() {
        this.props.relay.setVariables({
            count: this.props.relay.variables.count + PAGE_SIZE
        });
    }

}

UserListPage = Relay.createContainer(UserListPage, {
    initialVariables: {
        count: PAGE_SIZE
    },
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                users(first: $count) {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        node {
                            id
                            ${UserListItem.getFragment('user')}
                        }
                    }
                }
            }
    `,
    },
});

export const UserListPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UserListPage viewer={props.viewer}
                               navigator={props.navigator} />,
        {
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        ${UserListPage.getFragment('viewer')}
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
