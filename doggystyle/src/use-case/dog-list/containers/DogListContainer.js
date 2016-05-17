/* @flow */

import React from 'react';
import { connect } from "react-redux";
import DogList from "../components/DogList";

const DogListContainer = React.createClass({
    
    propTypes : {
    },
    
    componentDidMount() {
    },
    
    render() {
        return (
            <DogList/>
        );
    }
    
});

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DogListContainer);


