/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";

export const AddAnimalButton = React.createClass(
    {

        propTypes: {},

        render() {
            return (
                <Button raised
                        backgroundColor="#ccc"
                        icon={{name: 'check',  type: 'font-awesome'}}
                        title='ADD ANIMAL'
                        onPress={() => this.onClick()} />        );
        },

        onClick() {
            const {navigator} = this.props;

            navigator.push(
                {
                    screen: 'example.AddAnimalScreen',
                    title: `Add animal`,
                    passProps: {}
                });
        }

    });
