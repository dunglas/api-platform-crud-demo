import { combineReducers } from 'redux'

export function error(state = false, action) {
  if ('FOO_LIST_ERROR' === action.type) {
    return action.error;
  }

  return state;
}

export function loading(state = false, action) {
  if ('FOO_LIST_LOADING' === action.type) {
    return action.loading;
  }

  return state;
}

export function items(state = [], action) {
  if ('FOO_LIST_SUCCESS' === action.type) {
    return action.items;
  }

  return state;
}

export default combineReducers({error, loading, items});
