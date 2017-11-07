import * as api from '../utils/api';

export const LOADING_DECKS = 'LOADING_DECKS';
export const SAVE_DECK = 'SAVE_DECK';
export const UPDATE_DECK = 'UPDATE_DECK';

export const getDecks = () => dispatch =>
  api.getDecks().then(decks => dispatch({ type: LOADING_DECKS, payload: decks }));

export const saveDeckTitle = deck => dispatch =>
  api.saveDeck(deck).then(() => dispatch({ type: SAVE_DECK, payload: deck }));

export const addCardToDeck = deck => dispatch =>
  api.updateDeck(deck).then(() => dispatch({ type: UPDATE_DECK, payload: deck }));
