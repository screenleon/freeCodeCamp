import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import MyComponent from './component/MyComponent';
import ParentComponent from './ParentComponent';
import TypesOfFood from './component/TypesOfFood';
import MyComponent02 from './component/MyComponent02';
import Calendar from './component/Calendar';

import * as serviceWorker from './serviceWorker';

const hello = <h1>Hello JSX</h1>;
const JSX01 = (
  <div className="myDiv">
    <h1>Complex JSX Element</h1>
    <p>test JSX</p>
    <ul>
      <li>J</li>
      <li>S</li>
      <li>X</li>
    </ul>
    {/* react JSX comment */}
  </div>
);

const JSX02 = (
  <div>
    <h2>Welcome to React!</h2> <br />
    <p>Be sure to close all tags!</p>
    <hr />
  </div>
);

const MyComponentFunction = function () {
  return (
    <div>
      <p>The wolves stopped in their tracks, sizing up the mother and her cubs.</p>
      <MyComponent></MyComponent>
    </div>
  );
};

const display = (
  <div>
    <ParentComponent />
    <MyComponent02 />
    <Calendar />
  </div>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  [hello, JSX01, JSX02, MyComponentFunction(), display, <TypesOfFood />],
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
