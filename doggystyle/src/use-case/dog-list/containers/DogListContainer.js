/* @flow */

import React from 'react';
import {subscribe} from 'horizon-react';

import DogList from "../components/DogList";

const DogListContainer = React.createClass({

    propTypes : {},

    componentDidMount() {
    },

    render() {
        const { animals } = this.props;

        return (
            <DogList dogs={animals}/>
        );
    }

});

const mapDataToProps = {
    animals : (hz, props) => hz('animals').findAll({ owner : "abc123" })
};

// you can connect to redux state too
const mapStateToProps = (state, props) => ({});

export default subscribe({ mapDataToProps, mapStateToProps })(DogListContainer);


