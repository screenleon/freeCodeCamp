import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DisplayMessages, AppWrapper, PresentationalComponent, PresentationalMapToProp } from './component';
import { messageAddStore } from './redux';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

ReactDOM.render(
  [<DisplayMessages />, <AppWrapper />, <Provider store={messageAddStore}><PresentationalComponent /></Provider>,
    <PresentationalMapToProp />
  ],
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
