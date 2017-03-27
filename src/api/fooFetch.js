const entrypoint = 'http://localhost';
const jsonLdMimeType = 'application/ld+json';

export default function fooFetch(url, options = {}) {
  if ('undefined' === typeof options.headers) {
    options.headers = new Headers();
  }

  if (null === options.headers.get('Accept')) {
    options.headers.set('Accept', jsonLdMimeType);
  }

  if ('undefined' !== options.body && !(options.body instanceof FormData) && null === options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', jsonLdMimeType);
  }

  return fetch(entrypoint+url, options).then(response => {
    if (!response.ok) {
      return response
        .json()
        .then(json => {
          throw Error(json['hydra:description'] ? json['hydra:description'] : response.statusText)
        });
    }

    return response;
  });
}
