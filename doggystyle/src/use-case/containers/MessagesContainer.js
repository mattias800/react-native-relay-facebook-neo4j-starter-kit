/* @flow */

import React from 'react';
import {connect} from "react-redux";
import Messages from "../components/Messages";
import Horizon from "@horizon/client";

const MessagesContainer = React.createClass({

    propTypes : {},

    getInitialState() {
        return {
            messages : [],
            fetching : true
        }
    },

    componentDidMount() {
        const horizon = Horizon({ host : 'localhost:8181' });

        horizon.onReady(() => {
            console.log("Is connected!");

            this.setState({ connected : true });
            const messages = horizon("messages");

            this.setState({ messages : [], fetching : true });

            messages.watch().subscribe(messages => {
                this.setState({ messages, fetching : false });
            });

        });
        horizon.connect();

    },

    render() {
        const { messages, fetching } = this.state;

        return (
            <Messages fetching={fetching} messages={messages}/>
        );
    }

});

export default MessagesContainer;


