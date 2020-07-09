import React from 'react';
import * as serviceWorker from '../serviceWorker';

const List = (props) => {
    return <p>{Array.from(props.tasks).join(", ")}</p>
};

 export class ToDoList extends React.Component {
    _todayTodoList = ['walk dog', 'workout'];
    _tomorrowTodoList = ['eat', 'sleep'];
    render() {
        return (
            <div>
                <h1>To Do Lists</h1>
                <h2>Today</h2>
                <List tasks={this._todayTodoList} />
                <h2>Tomorrow</h2>
                <List tasks={this._tomorrowTodoList}/>
            </div>
        );
    }
};

serviceWorker.unregister();