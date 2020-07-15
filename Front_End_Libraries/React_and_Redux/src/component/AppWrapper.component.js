import React from 'react';
import * as serviceWorker from '../serviceWorker';
import { DisplayMessages } from './index';
import * as ReactRedux from 'react-redux';
import { messageAddStore } from '../redux';

const Provider = ReactRedux.Provider;


export class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={messageAddStore}>
                <DisplayMessages />
            </Provider>
        )
    }
};

serviceWorker.unregister();