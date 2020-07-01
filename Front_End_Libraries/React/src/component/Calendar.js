import React from 'react';
import * as serviceWorker from '../serviceWorker';

const CurrentDate = (props) => {
    return (
        <div>
            <p>The current date is: {props.date}</p>
        </div>
    );
};

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>What date is it?</h3>
                <CurrentDate date={Date()}/>
            </div>
        );
    }
};

serviceWorker.unregister();
export default Calendar;