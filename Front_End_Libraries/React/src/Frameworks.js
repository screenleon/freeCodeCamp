import React from 'react';
import * as serviceWorker from './serviceWorker';

const frontEndFrameworks = [
    'React',
    'Angular',
    'Ember',
    'Knockout',
    'Backbone',
    'Vue'
];

export function Frameworks() {
    const renderFrameworks = frontEndFrameworks.map((element, index) => <li key={index}>{element}</li>);
    return (
        <div>
            <h1>Popular Front End JavaScript Frameworks</h1>
            <ul>
                {renderFrameworks}
            </ul>
        </div>
    );
};


serviceWorker.unregister();