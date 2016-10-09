/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {createRelayRenderer} from "../../../common/util/RelayFactory";
import {UserProfile} from "./components/UserProfile";
import {getAuthTokenUsedByRelay} from "../../../network/RelayNetworkConfig";
import {AddAnimalPageComponent} from "../../animals/add-animal/AddAnimalPage";
import {Button} from "react-native-elements";

class ViewerProfilePage extends React.Component {

    render() {
        const {user, navigator} = this.props;
        const {firstName, lastName} = user;

        navigator.setTitle({title: `${firstName} ${lastName}`});

        return (
            <ScrollView style={{marginTop:20}}>
                <UserProfile user={user}
                             navigator={navigator}
                             isCurrentUser={true} />
                <Button raised
                        backgroundColor="#abe"
                        icon={{name: 'plus',  type: 'font-awesome'}}
                        title='ADD DOG'
                        onPress={() => this.addAnimalClicked()} />
            </ScrollView>
        );
    }

    addAnimalClicked() {
        this.props.navigator.push({
                                      screen: 'example.AddAnimalScreen',
                                      title: AddAnimalPageComponent.PageTitle
                                  });
    }

}

ViewerProfilePage = Relay.createContainer(ViewerProfilePage, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                firstName
                lastName
                ${UserProfile.getFragment('user')}
            }
    `,
    },
});

export const ViewerProfilePageComponent = createRelayRenderer(
    Relay.createContainer(
        props => <ViewerProfilePage user={props.viewer.actor}
                                    navigator={props.navigator} />,
        {
            fragments: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        actor {
                            ${ViewerProfilePage.getFragment('user')}
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
