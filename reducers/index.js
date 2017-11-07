import { combineReducers } from 'redux';
import { LOADING_DECKS, SAVE_DECK, UPDATE_DECK } from '../actions';

const initState = [
  {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
]

function decks(state = [], action) {
  switch (action.type) {
    case LOADING_DECKS:
      return [...state, ...action.payload];
    case SAVE_DECK:
      return [...state, action.payload];
    case UPDATE_DECK:
      return state.map(
        deck => (deck.title === action.payload.title ? action.payload : deck),
      );
    default:
      return state;
  }
}

export default combineReducers({ decks });
