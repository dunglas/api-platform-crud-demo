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

    fetch('http://localhost/foos', {
        method: 'POST',
        headers: new Headers({Accept: 'application/ld+json', 'Content-Type': 'application/ld+json'}),
        body: JSON.stringify(values),
      }
    )
      .then(response => {
        dispatch(loading(false));

        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(success(data)))
      .catch(() => dispatch(error(true)));
  };
}
