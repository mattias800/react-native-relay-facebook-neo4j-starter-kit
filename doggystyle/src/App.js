/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {configureStore} from "./Store";

import MessagesContainer from "./use-case/messages/containers/MessagesContainer";
import {Connector} from 'horizon-react';
import LoadingScreen from "./LoadingScreen";
import UiRoot from "./UiRoot";

const store = configureStore({});

const App = React.createClass({

    propTypes : {},

    render() {
        const horizonProps = { host : 'localhost:8181' };

        return (
            <Connector store={store}
                       horizonProps={horizonProps}
                       loadingComponent={LoadingScreen}>
                <UiRoot/>
            </Connector>
        );
    }

});

export default App;
