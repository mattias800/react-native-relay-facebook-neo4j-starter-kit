/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MainContent from "../../../common/ui/MainContent";

const DogList = React.createClass({
    
    propTypes : {},

    render() {
        return (
            <MainContent>
                <Text>Dogs</Text>
            </MainContent>
        );
    }

});

export default DogList;
