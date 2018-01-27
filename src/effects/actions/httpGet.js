const fetch = require("fetch-everywhere");

module.exports = function({ url }) {
  return fetch(url);
};
