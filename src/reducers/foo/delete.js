import { combineReducers } from 'redux'

export function error(state = false, action) {
  if ('FOO_DELETE_ERROR' === action.type) {
    return action.error;
  }

  return state;
}

export function loading(state = false, action) {
  if ('FOO_DELETE_LOADING' === action.type) {
    return action.loading;
  }

  return state;
}

export function deleted(state = null, action) {
  if ('FOO_DELETE_SUCCESS' === action.type) {
    return action.deleted;
  }

  return state;
}

export default combineReducers({error, loading, deleted});
