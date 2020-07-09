import React from 'react';
import * as serviceWorker from '../serviceWorker';

// const TypesOfFruit = () => {
//     return (
//         <div>
//             <ul>
//                 <li>Apples</li>
//                 <li>Blueberries</li>
//                 <li>Strawberries</li>
//                 <li>Bananas</li>
//             </ul>
//         </div>
//     );
// };

const NonCitrus = () => {
    return (
        <div>
            <h3>NonCitrus:</h3>
            <ul>
                <li>Apples</li>
                <li>Blueberries</li>
                <li>Strawberries</li>
                <li>Bananas</li>
            </ul>
        </div>
    );
};

const Citrus = () => {
    return (
        <div>
            <h3>Citus:</h3>
            <ul>
                <li>Lemon</li>
                <li>Lime</li>
                <li>Orange</li>
                <li>Grapefruit</li>
            </ul>
        </div>
    );
};

const Fruits = () => {
    return (
        <div>
            <h2>Fruits:</h2>
            <NonCitrus />
            <Citrus />
        </div>
    );
};

const Vegetables = () => {
    return (
        <div>
            <h2>Vegetables:</h2>
            <ul>
                <li>Cucumber</li>
                <li>Tomato</li>
                <li>Legume</li>
            </ul>
        </div>
    );
};

class TypesOfFood extends React.Component {
    render() {
        return (
            <div>
                <h1>Types of Food:</h1>
                <Fruits />
                <Vegetables />
            </div>
        );
    }
};

serviceWorker.unregister();
export default TypesOfFood;