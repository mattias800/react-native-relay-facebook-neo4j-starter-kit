/* @flow */

import React from 'react';
import {connect} from "react-redux";
import Home from "../components/Home";

const HomeContainer = React.createClass({
    
    propTypes : {},
    
    renderNavigationBar(props) {
        
    },
    
    componentDidMount() {
    },
    
    render() {
        
        return (
            <Home/>
        );
    }
    
});

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);


