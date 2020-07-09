import React from 'react';
import * as serviceWorker from '../serviceWorker';
import PropTypes  from 'prop-types';

const Items = (props) => {
    return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
    quantity: 0
}

Items.propTypes = {
    quantity: PropTypes.number.isRequired
}

export class ShoppingCart extends React.Component {
    render() {
        return <Items quantity={100}/>
    }
};

serviceWorker.unregister();