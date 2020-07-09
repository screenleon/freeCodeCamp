import React from 'react';
import * as serviceWorker from '../serviceWorker';

class MyComponent02 extends React.Component {
    render() {
        return (
            <h1>My First React Component!</h1>
        )
    }
};

serviceWorker.unregister();
export default MyComponent02;