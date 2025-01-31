// utils -> fetchEmbed

const fetch = require('node-fetch').default;

const fetchEmbed = (url, provider, params) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name, // eslint-disable-line camelcase
      provider_url, // eslint-disable-line camelcase
      url: resourceUrl
    } = provider;

    resourceUrl = resourceUrl.replace(/\{format\}/g, 'json');

    let link = `${resourceUrl}?format=json&url=${encodeURIComponent(url)}`;
    link =
      params && params.maxwidth ? `${link}&maxwidth=${params.maxwidth}` : link;
    link =
      params && params.maxheight
        ? `${link}&maxheight=${params.maxheight}`
        : link;

    const proxy = 'https://cors-anywhere.herokuapp.com/';

    return fetch(proxy + link)
      .then(res => {
        return res.json();
      })
      .then(json => {
        json.provider_name = provider_name; // eslint-disable-line camelcase
        json.provider_url = provider_url; // eslint-disable-line camelcase
        return resolve(json);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

module.exports = fetchEmbed;
