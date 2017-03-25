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

    fetch('http://localhost/foos', {headers: new Headers({Accept: 'application/ld+json'})})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(loading(false));

        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(success(data['hydra:member'])))
      .catch(() => dispatch(error(true)));
  };
}
