import fooFetch from '../../api/fooFetch';

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

    fooFetch(item['@id'], {method: 'DELETE'})
      .then(() => {
        dispatch(loading(false));
        dispatch(success(item))
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message))
      });
  };
}
