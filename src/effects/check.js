const nowCmd = require("./commands/now");
const httpGetCmd = require("./commands/httpGet");
const { success, failure } = require("@pheasantplucker/failables");

module.exports = function*(url) {
  const start = yield nowCmd();
  try {
    const response = yield httpGetCmd(url);
    const end = yield nowCmd();
    return success(response, {
      time: end - start
    });
  } catch (e) {
    const end = yield nowCmd();
    return failure(e, {
      time: end - start
    });
  }
};
