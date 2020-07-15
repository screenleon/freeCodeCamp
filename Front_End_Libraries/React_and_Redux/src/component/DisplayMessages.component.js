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
    }

    handleChange() {

    }

    submitMessages() {

    }

    render() {
        return (
            <div>
                <input type="text" value={this.handleChange} />
            </div>
        )
    }
};

serviceWorker.unregister()