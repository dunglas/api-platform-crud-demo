import fooFetch from '../../api/fooFetch';

export function error(error) {
  return {type: 'FOO_LIST_ERROR', error};
}

export function loading(loading) {
  return {type: 'FOO_LIST_LOADING', loading};
}

export function success(items) {
  return {type: 'FOO_LIST_SUCCESS', items};
}

export function list() {
  return (dispatch) => {
    dispatch(loading(true));

    fooFetch('/foos')
      .then(response => response.json())
      .then(data => {
        dispatch(loading(false));
        dispatch(success(data['hydra:member']));
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message))
      });
  };
}

export function reset() {
  return {type: 'FOO_LIST_RESET'};
}
