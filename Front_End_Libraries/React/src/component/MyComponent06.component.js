import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUsers: null,
            message: ''
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // componentWillMount() {
    //     console.log('test');
    // }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                activeUsers: 1273
            });
        }, 2500);
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleEnter() {
        this.setState({
            message: this.state.message + 'You pressed the enter key! '
        });
    }
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.handleEnter();
        }
    }

    render() {
        return (
            <div>
                <div />
                <h1>Active Users: {this.state.activeUsers}</h1>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
};

serviceWorker.unregister();