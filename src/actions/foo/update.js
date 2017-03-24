export function retrieveError(retrieveError) {
  return {type: 'FOO_UPDATE_RETRIEVE_ERROR', retrieveError};
}

export function retrieveLoading(retrieveLoading) {
  return {type: 'FOO_UPDATE_RETRIEVE_LOADING', retrieveLoading};
}

export function retrieveSuccess(item) {
  return {type: 'FOO_UPDATE_RETRIEVE_SUCCESS', item};
}

export function retrieve(id) {
  return (dispatch) => {
    dispatch(retrieveLoading(true));

    fetch(`http://localhost${id}`, {headers: new Headers({'Accept': 'application/ld+json'})})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(retrieveLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(retrieveSuccess(data)))
      .catch(() => dispatch(retrieveError(true)));
  };
}

export function updateError(updateError) {
  return {type: 'FOO_UPDATE_UPDATE_ERROR', updateError};
}

export function updateLoading(updateLoading) {
  return {type: 'FOO_UPDATE_UPDATE_LOADING', updateLoading};
}

export function updateSuccess(item) {
  return {type: 'FOO_UPDATE_UPDATE_SUCCESS', item};
}

export function update(item, values) {
  return (dispatch) => {
    dispatch(updateLoading(true));

    fetch(`http://localhost${item['@id']}`, {
        method: 'PUT',
        headers: new Headers({'Accept': 'application/ld+json', 'Content-Type': 'application/ld+json'}),
        body: JSON.stringify(values),
      }
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(updateLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(updateSuccess(data)))
      .catch(() => dispatch(updateError(true)));
  };
}
