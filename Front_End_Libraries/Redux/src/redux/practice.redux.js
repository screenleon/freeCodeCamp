import * as serviceWorker from '../serviceWorker';
import * as Redux from 'redux';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// const reducer = (state = 5) => {
//   return state;
// }
// const store = Redux.createStore(reducer);

// const store = Redux.createStore(
//   (state = 5) => state
// );
// const currentState = store.getState();

// const action = {
//   type: 'LOGIN'
// }
// function actionCreator() {
//   return action;
// }

// const store = Redux.createStore(
//   (state = { login: false }) => state
// );
// const loginAction = () => {
//   return {
//     type: LOGIN
//   }
// };
// store.dispatch(loginAction());

// const defaultState = {
//   login: false,
//   authenticated: false
// };
// const reducer = (state = defaultState, action) => {
//   if (action.type === 'LOGIN') {
//     return {
//       login: true
//     };
//   } else {
//     return state;
//   }
// };
// const store = Redux.createStore(reducer);

// const authReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case LOGIN:
//       return {
//         authenticated: true
//       };
//     case LOGOUT:
//       return {
//         authenticated: false
//       };
//     default:
//       return state;
//   }
// };
// const store = Redux.createStore(authReducer);
// const logoutUser = () => {
//   return {
//     type: LOGOUT
//   }
// }

const ADD = 'ADD';
const reducer = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};
const store = Redux.createStore(reducer);
let count = 0;
store.subscribe(() => count++)
store.dispatch({ type: ADD });
console.log(count);
store.dispatch({ type: ADD });
console.log(count);
store.dispatch({ type: ADD });
console.log(count);

serviceWorker.unregister();