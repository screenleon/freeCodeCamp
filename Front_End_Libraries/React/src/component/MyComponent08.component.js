import React from 'react';
import * as serviceWorker from '../serviceWorker';

export class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'Jeff',
                    online: true
                },
                {
                    username: 'Alan',
                    online: false
                },
                {
                    username: 'Mary',
                    online: true
                },
                {
                    username: 'Jim',
                    online: false
                },
                {
                    username: 'Sara',
                    online: true
                },
                {
                    username: 'Laura',
                    online: true
                }
            ]
        }
    }
    render() {
        const usersOnline = this.state.users.filter(element => !!element.online);
        const renderOnline = usersOnline.map((element, index) => <li key={index}>{element.username}</li>);
        return (
            <div>
                <h1>Current Online Users:</h1>
                <ul>
                    {renderOnline}
                </ul>
            </div>
        );
    }
};

serviceWorker.unregister();