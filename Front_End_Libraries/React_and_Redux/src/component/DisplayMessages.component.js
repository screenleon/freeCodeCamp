import React from 'react';
import * as serviceWorker from '../serviceWorker'

export class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitMessages = this.submitMessages.bind(this);
    }

    handleChange(event) {
        this.setState({ input: event.target.value });
    }

    submitMessages() {
        this.setState((state) => ({
            input: '',
            messages: [state.input, ...state.messages]
        }))
    }

    render() {
        const items = this.state.messages.map((element, index) => <li key={index}>{element}</li>);
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input type="text" value={this.state.input} onChange={this.handleChange} />
                <button onClick={this.submitMessages}>submit</button>
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
};

serviceWorker.unregister()