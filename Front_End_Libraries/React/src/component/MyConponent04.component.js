import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'Initial State',
        text: "Hello"
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            name: 'React Rocks!',
            text: 'You clicked!'
        })
    }
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Click Me</button>
          <h1>{this.state.name}</h1>
          <h1>{this.state.text}</h1>
        </div>
      );
    }
  };
  
serviceWorker.unregister();