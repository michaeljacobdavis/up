const { now: nowCmd } = require("effects-as-data-universal").cmds;
const httpGetCmd = require("./commands/httpGet");
const { success, failure } = require("@pheasantplucker/failables");

module.exports = function*(url) {
  const start = yield nowCmd();
  try {
    const response = yield httpGetCmd(url);
    const end = yield nowCmd();
    return success(response, {
      duration: end - start
    });
  } catch (e) {
    const end = yield nowCmd();
    return failure(e, {
      duration: end - start
    });
  }
};
