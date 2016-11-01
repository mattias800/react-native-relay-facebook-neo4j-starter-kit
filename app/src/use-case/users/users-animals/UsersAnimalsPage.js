/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../../common/util/RelayFactory";
import {List, ListItem} from "react-native-elements";

class UsersAnimalsPage extends React.Component {

    render() {
        const {user} = this.props;
        const animals = user.animals;

        console.log("animals");
        console.log(animals);

        return (
            <ScrollView>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        animals.edges && animals.edges.length
                            ? animals.edges
                            .map(edge => edge.node)
                            .map(animal => (
                                <ListItem roundAvatar
                                          key={animal.id}
                                          avatar={animal.profilePhotoUrl}
                                          title={animal.nickName}
                                          subtitle={animal.fullName}
                                          onPress={() => {}} />
                            ))
                            : <Text>No animals</Text>
                    }
                </List>
            </ScrollView>
        );
    }

}

UsersAnimalsPage = Relay.createContainer(UsersAnimalsPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                animals(first: 10) {
                    edges {
                        node {
                            id
                            nickName
                            fullName
                            profilePhotoUrl
                        }
                    }
                }
            }
    `,
    },
});

export const UsersAnimalsPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <UsersAnimalsPage user={props.viewer.user}
                                   navigator={props.navigator} />,
        {
            initialVariables: {
                userId: null
            },
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        user(id: $userId) {
                            ${UsersAnimalsPage.getFragment('user')}
                        }
                    }
        `,
            },
        }),

    props => ({
        queries: {
            viewer: (Component, params) =>
                Relay.QL`
                     query {
                        viewer {
                            ${Component.getFragment('viewer', params)},
                        }
                     }
        `,
        },
        params: {
            userId: props.userId
        },
        name: 'UserFriendListRoute',
    })
);
