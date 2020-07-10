import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class Colorful extends React.Component {
    render() {
        const styles = { color: "purple", fontSize: 40, border: "2px solid purple" };
        return (
            <div>
                <div style={{ color: 'red', fontSize: 72 }}>Big Red</div>
                <div style={styles}>Style Me!</div>
            </div>
        );
    }
};

serviceWorker.unregister();