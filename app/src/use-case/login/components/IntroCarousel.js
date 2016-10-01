/* @flow */

import React from "react";
import {AppRegistry, StyleSheet, Text, Image, View, Dimensions} from "react-native";
import Carousel from "react-native-carousel";

export const IntroCarousel = React.createClass({

    propTypes: {
        height: React.PropTypes.number.isRequired
    },

    render() {
        const {height} = this.props;
        const window = Dimensions.get('window');

        return (
            <Carousel width={window.width}
                      animate={false}
                      indicatorColor="#ffffff"
                      inactiveIndicatorColor="#cccccc"
                      indicatorOffset={20}
                      indicatorSize={23}
                      indicatorSpace={15}>
                <View style={pageContainer}>
                    <Image style={imageStyle}
                           resizeMode="cover"
                           source={require("../images/autumn-pitbull.jpg")}>
                        <Text>Page 1</Text>
                    </Image>
                </View>
                <View style={pageContainer}>
                    <Image style={imageStyle}
                           resizeMode="cover"
                           source={require("../images/happy-dog.jpg")}>
                        <Text>Page 2</Text>
                    </Image>
                </View>
                <View style={pageContainer}>
                    <Image style={imageStyle}
                           resizeMode="cover"
                           source={require("../images/sobaka.jpg")}>
                        <Text>Page 3</Text>
                    </Image>
                </View>
            </Carousel>
        );
    }

});

const container = {
    flex: 1,
};


const pageContainer = {
    flex: 1,
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
};

const imageContainer = {
    flex: 1,
    position: "relative"
};

const imageStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

