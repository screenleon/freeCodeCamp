import React from 'react';
import * as serviceWorker from '../serviceWorker';

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React!</h1>
            </div>
        )
    }
};

serviceWorker.unregister();
export default MyComponent;