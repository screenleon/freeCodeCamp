import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'CamperBot',
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Navbar name={this.state.name} />
                <GetInput value={this.state.inputValue} handleChange={this.handleChange} />
                <RenderInput input={this.state.inputValue} />
            </div>
        );
    }
};

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, my name is: {this.props.name} </h1>
            </div>
        );
    }
};

class GetInput extends React.Component {
    render() {
        return (
            <div>
                <h3>Get Input:</h3>
                <input
                    value={this.props.input}
                    onChange={this.props.handleChange} />
            </div>
        );
    }
};

class RenderInput extends React.Component {
    render() {
        return (
            <div>
                <h3>Input Render:</h3>
                <p>{this.props.input}</p>
            </div>
        );
    }
};

serviceWorker.unregister();