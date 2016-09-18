/* @flow */

import React from "react";
import Home from "./use-case/home/components/Home";
import DogList from "./use-case/dog-list/components/DogList";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {ViewerProfilePageRoot} from "./use-case/profile/ViewerProfilePage";

const UiRoot = React.createClass({

    propTypes: {},

    render() {
        return (
            <ScrollableTabView tabBarPosition="bottom">
                <ViewerProfilePageRoot tabLabel="Profile" />
                <Home tabLabel="Home" />
                <DogList tabLabel="Dogs" />
            </ScrollableTabView>
        );
    }

});

export default UiRoot;
