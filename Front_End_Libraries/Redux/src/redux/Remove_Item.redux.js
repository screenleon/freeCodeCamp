import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';

const immutableReducer = (state = [0, 1, 2, 3, 4, 5], action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      console.log(action)
      return state.filter((element, index) => index !== action.index)
    default:
      return state;
  }
};
const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}
const store = Redux.createStore(immutableReducer);
serviceWorker.unregister();
