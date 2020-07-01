import React from 'react';
import * as serviceWorker from './serviceWorker';

const ChildComponent = () => {
    return (
        <div>
            <p>I am the child</p>
        </div>
    );
};

class ParentComponent extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div>
                <h1>I am the parent</h1>
                { /* change code below this line */}
                <ChildComponent />
                { /* change code above this line */}
            </div>
        );
    }
};


serviceWorker.unregister();
export default ParentComponent;