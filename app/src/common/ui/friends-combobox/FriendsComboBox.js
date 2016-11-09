/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import {ComboBox} from "../combobox/ComboBox";

export class FriendsComboBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetching: false
        }
    }

    render() {
        const {fetching} = this.state;
        const {actor} = this.props;
        const friends = actor.searchFriendsByText.edges.map(edge => edge.node) || [];

        return (
            <ComboBox onChange={selectedUsers => console.log("selected", selectedUsers)}
                      onChangeText={text => this.onChangeText(text)}
                      allowDuplicates={false}
                      labelReducer={friend => `${friend.firstName} ${friend.lastName}`}
                      keyReducer={friend => friend.id}
                      fetching={fetching}
                      data={friends} />

        );
    }

    onChangeText(text) {
        this.setState({fetching: true});
        this.props.relay.setVariables(
            {
                text: text || ""
            },
            (readyState) => {
                if (readyState.done) {
                    this.setState({fetching: false});
                }
            }
        );
    }

}

FriendsComboBox = Relay.createContainer(FriendsComboBox, {
    initialVariables: {
        text: ""
    },
    fragments: {
        actor: () => Relay.QL`
            fragment on User {
                searchFriendsByText(first:10 text:$text) {
                    edges {
                        node {
                            id
                            firstName
                            lastName                                            
                        }
                    }
                }
            }
    `,
    },
});
