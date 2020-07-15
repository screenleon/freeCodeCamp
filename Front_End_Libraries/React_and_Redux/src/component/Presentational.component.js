import React from 'react';
import * as ReactRedux from 'react-redux';
import * as serviceWorker from '../serviceWorker';
import { DisplayMessages } from './';

const addMessage = (message) => {
    return {
        type: 'ADD',
        message
    }
};

const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message));
        }
    }
};

class Presentational extends React.Component {
    render() {
        return (
            <div>
                <h3>This is a Presentational Component</h3>
                <DisplayMessages />
            </div>
        )
    }
};

const connect = ReactRedux.connect;
// change code below this line
export default connect(mapStateToProps, mapDispatchToProps)(Presentational);

serviceWorker.unregister();