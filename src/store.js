import { createStore, } from "redux";


//Initial State
const initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: []
};

//Action Constants
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const UNDO = 'UNDO'
export const REDO = 'REDO'

//Reducer
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        currentValue: state.currentValue + action.payload,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues]
      };

    case DECREMENT:
      return {
        ...state,
        currentValue: state.currentValue - action.payload,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues]
      };
    case UNDO:
      return {
        currentValue: state.previousValues[0],
        futureValues: [state.currentValue, ...state.futureValues],
        previousValues: state.previousValues.slice(1)
      };

    case REDO:
      return {
        currentValue: state.futureValues[0],
        futureValues: state.futureValues.slice(1),
        previousValues: [state.currentValue, ...state.previousValues]
      };

    default:
      return state;
  }
}

//export reducer

export default createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
