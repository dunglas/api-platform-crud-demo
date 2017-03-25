import { BASE_URL } from '../../config.js'

export function error(error) {
  return {type: 'FOO_CREATE_ERROR', error};
}

export function loading(loading) {
  return {type: 'FOO_CREATE_LOADING', loading};
}

export function success(item) {
  return {type: 'FOO_CREATE_SUCCESS', item};
}

export function create(values) {
  return (dispatch) => {
    dispatch(loading(true));

    fetch(`${BASE_URL}/foos`, {
        method: 'POST',
        headers: new Headers({'Accept': 'application/ld+json', 'Content-Type': 'application/ld+json'}),
        body: JSON.stringify(values),
      }
    )
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(loading(false));

      return response;
    })
    .then(response => response.json())
    .then(data => dispatch(success(data)))
    .catch(() => dispatch(error(true)));
  };
}
