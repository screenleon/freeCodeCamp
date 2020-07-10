import React from 'react';
import * as serviceWorker from '../serviceWorker';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div />
    }
};

// this can render html
ReactDOMServer.renderToString(<App />);

serviceWorker.unregister();