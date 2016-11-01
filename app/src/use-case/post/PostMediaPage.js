/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, ScrollView} from "react-native";
import {createRootRelayComponent, createRelayRenderer} from "../../common/util/RelayFactory";
import {getCurrentUserId} from "../../network/RelayNetworkConfig";
import {PostMediaForm} from "./components/PostMediaForm";

class PostMediaPage extends React.Component {

    render() {
        const {user, navigator, source} = this.props;

        return (
            <ScrollView>
                <Text>PostMediaPage</Text>
                <PostMediaForm user={user}
                               imageSource={source}
                               navigator={navigator} />
            </ScrollView>
        );
    }

}

PostMediaPage = Relay.createContainer(PostMediaPage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                email
                ${PostMediaForm.getFragment('user')}
            }
    `,
    },
});

export const PostMediaPageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <PostMediaPage user={props.viewer.actor}
                                source={props.source}
                                navigator={props.navigator} />,
        {
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        actor {
                            ${PostMediaPage.getFragment('user')}
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
            currentUserId: getCurrentUserId()
        },
        name: 'PostMediaPageRoute',
    })
);
