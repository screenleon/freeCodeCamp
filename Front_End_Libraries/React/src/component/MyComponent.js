import React from 'react';
import * as serviceWorker from '../serviceWorker';

class MyComponent extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        // change code below this line
        return (
            <div>
                <h1>Hello React!</h1>
            </div>
        )
        // change code above this line
    }
};

serviceWorker.unregister();
export default MyComponent;