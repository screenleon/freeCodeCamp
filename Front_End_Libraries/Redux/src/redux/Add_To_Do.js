import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';

const ADD_TO_DO = 'ADD_TO_DO';
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];
// action.todo is String
const immutableReducer = (state = todos, action) => {
  switch (action.type) {
    case ADD_TO_DO:
      return state.push(...action.todo);
    default:
      return state;
  }
};
const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}
const store = Redux.createStore(immutableReducer);

serviceWorker.unregister();
