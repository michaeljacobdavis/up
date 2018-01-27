const { call } = require("effects-as-data");
const { handlers } = require("effects-as-data-universal");
const execute = require("./effects/execute");
const httpGet = require("./effects/handlers/httpGet");
const write = require("./effects/handlers/write");

module.exports = ([url, interval]) => {
  const fn = () =>
    call({}, { ...handlers, httpGet, write, setInterval }, execute, url).catch(
      console.error
    );
  return setInterval(fn, interval);
};
