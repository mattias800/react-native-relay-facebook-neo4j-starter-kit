/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Row} from "../../../common/ui/Row";
import {Icon} from "react-native-elements";

export const SwipeToLearnMore = React.createClass(
    {

        propTypes: {},

        render() {
            return (
                <View alignItems="center">
                    <Row style={backgroundStyle}
                         justifyContent="center">
                        <Text style={textStyle}>Swipe to learn more</Text>
                        <View style={{marginLeft:10}}>
                            <Icon name="arrow-right"
                                  size={16}
                                  color="#ffffff"

                                  type="font-awesome" />
                        </View>
                    </Row>
                </View>
            );
        }

    });


const backgroundStyle = {
    width: 250,
    backgroundColor: "#225522",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    opacity: 0.7
};

const textStyle = {
    fontSize: 12,
    color: "#ffffff"
};