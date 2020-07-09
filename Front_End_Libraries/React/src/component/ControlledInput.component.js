import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class ControlledInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        // change code below this line
        this.handleChange = this.handleChange.bind(this);
        // change code above this line
    }
    // change code below this line
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} value={this.state.input}/>
                <h4>Controlled Input:</h4>
                <p>{this.state.input}</p>
            </div>
        );
    }
};

serviceWorker.unregister();