/* @flow */

import React from 'react';
import {connect} from "react-redux";
import Messages from "../components/Messages";
import Horizon from "@horizon/client";
import {subscribe} from 'horizon-react';

const MessagesContainer = React.createClass({

    render() {
        const { messages } = this.props;

        return (
            <Messages messages={messages}/>
        );
    }

});

const mapDataToProps = {
    messages : (hz, props) => hz('messages')
};

// you can connect to redux state too
const mapStateToProps = (state, props) => ({});

export default subscribe({ mapDataToProps, mapStateToProps })(MessagesContainer);


