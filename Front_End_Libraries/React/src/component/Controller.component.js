import React from 'react';
import * as serviceWorker from '../serviceWorker';

class OnlyEvens extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Should I update?');
        return nextProps.value % 2 === 0;
    }
    componentDidUpdate() {
        console.log('Component re-rendered.');
    }
    render() {
        return <h1>{this.props.value}</h1>
    }
};

export class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.addValue = this.addValue.bind(this);
    }
    addValue() {
        this.setState({
            value: this.state.value + 1
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.addValue}>Add</button>
                <OnlyEvens value={this.state.value} />
            </div>
        );
    }
};


serviceWorker.unregister();