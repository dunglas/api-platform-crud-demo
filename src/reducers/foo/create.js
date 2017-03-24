import { combineReducers } from 'redux'

export function error(state = false, action) {
  if ('FOO_CREATE_ERROR' === action.type) {
    return action.error;
  }

  return state;
}

export function loading(state = false, action) {
  if ('FOO_CREATE_LOADING' === action.type) {
    return action.loading;
  }

  return state;
}

export function item(state = null, action) {
  if ('FOO_CREATE_SUCCESS' === action.type) {
    return action.item;
  }

  return state;
}

export default combineReducers({error, loading, item});
