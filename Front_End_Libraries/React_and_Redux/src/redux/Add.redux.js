import * as Redux from 'redux';

const ADD = 'ADD';

// const addMessage = message => {
//     return {
//         type: ADD,
//         message
//     }
// }

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [...state, action.message]
        default:
            return state;
    }
}

export const store = Redux.createStore(messageReducer);
