const setIntervalCmd = require("./commands/setInterval");

module.exports = function*(url, time) {
  yield nowCmd();
};
