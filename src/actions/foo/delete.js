export function error(error) {
  return {type: 'FOO_DELETE_ERROR', error};
}

export function loading(loading) {
  return {type: 'FOO_DELETE_LOADING', loading};
}

export function success(deleted) {
  return {type: 'FOO_DELETE_SUCCESS', deleted};
}

export function del(item) {
  return (dispatch) => {
    dispatch(loading(true));

    fetch(`http://localhost${item['@id']}`, {method: 'DELETE', headers: new Headers({Accept: 'application/ld+json'})})
      .then(response => {
        dispatch(loading(false));

        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(() => dispatch(success(item)))
      .catch(() => dispatch(error(true)));
  };
}
