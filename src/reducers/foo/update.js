import { combineReducers } from 'redux'

export function retrieveError(state = false, action) {
  if ('FOO_UPDATE_RETRIEVE_ERROR' === action.type) {
    return action.retrieveError;
  }

  return state;
}

export function retrieveLoading(state = false, action) {
  if ('FOO_UPDATE_RETRIEVE_LOADING' === action.type) {
    return action.retrieveLoading;
  }

  return state;
}

export function updateError(state = false, action) {
  if ('FOO_UPDATE_UPDATE_ERROR' === action.type) {
    return action.updateError;
  }

  return state;
}

export function updateLoading(state = false, action) {
  if ('FOO_UPDATE_UPDATE_LOADING' === action.type) {
    return action.updateLoading;
  }

  return state;
}

export function item(state = {}, action) {
  if ('FOO_UPDATE_RETRIEVE_SUCCESS' === action.type || 'FOO_UPDATE_UPDATE_SUCCESS' === action.type) {
    return action.item;
  }

  return state;
}

export default combineReducers({retrieveError, retrieveLoading, updateError, updateLoading, item});
