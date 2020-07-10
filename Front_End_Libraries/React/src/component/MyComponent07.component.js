import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true
        }
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }
    toggleDisplay() {
        this.setState({
            display: !this.state.display
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.toggleDisplay}>Toggle Display</button>
                {this.state.display && <h1>Displayed!</h1>}
            </div>
        );
        /*
        if (this.state.display)
            return (
                <div>
                    <button onClick={this.toggleDisplay}>Toggle Display</button>
                    <h1>Displayed!</h1>
                </div>
            );
        else {
            return (
                <div>
                    <button onClick={this.toggleDisplay}>Toggle Display</button>
                </div>
            )
        }
        */
    }
};

serviceWorker.unregister();