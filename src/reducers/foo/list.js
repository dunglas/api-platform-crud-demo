import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'FOO_LIST_ERROR':
      return action.error;

    case 'FOO_LIST_RESET':
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'FOO_LIST_LOADING':
      return action.loading;

    case 'FOO_LIST_RESET':
      return false;

    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'FOO_LIST_SUCCESS':
      return action.items;

    case 'FOO_LIST_RESET':
      return [];

    default:
      return state;
  }
}

export default combineReducers({error, loading, items});
