import fooFetch from '../../api/fooFetch';

export function error(error) {
  return {type: 'FOO_CREATE_ERROR', error};
}

export function loading(loading) {
  return {type: 'FOO_CREATE_LOADING', loading};
}

export function success(created) {
  return {type: 'FOO_CREATE_SUCCESS', created};
}

export function create(values) {
  return (dispatch) => {
    dispatch(loading(true));

    fooFetch('/foos', {method: 'POST', body: JSON.stringify(values)})
      .then(response => {
        dispatch(loading(false));

        return response.json();
      })
      .then(data => dispatch(success(data)))
      .catch(e => {
        dispatch(loading(false));

        dispatch(error(e.message))
      });
  };
}
