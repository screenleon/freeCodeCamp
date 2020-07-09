import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class StatefulComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: 'Stateful'
      }
    }
    
    render() {
      return (
        <div>
          <h1>{this.state.name}</h1>
        </div>
      );
    }
  };

serviceWorker.unregister();