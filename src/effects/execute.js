const { call } = require("effects-as-data-universal").cmds;
const check = require("./check");
const write = require("./write");

module.exports = function*(url) {
  const response = yield call(check, url);
  return yield call(write, response);
};
