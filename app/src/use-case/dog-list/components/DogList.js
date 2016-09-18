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

    propTypes : {
        dogs : React.PropTypes.array
    },

    render() {
        const { dogs } = this.props;
        return (
            <MainContent>
                <Text>Dogs ({dogs && dogs.length})</Text>
                {
                    dogs && dogs.map(dog =>
                        <View key={dog.id}>
                            <Text>{dog.nickName}</Text>
                        </View>
                    )
                }
            </MainContent>
        );
    }

});

export default DogList;
