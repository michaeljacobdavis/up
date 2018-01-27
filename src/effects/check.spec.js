const { testFn, args } = require("effects-as-data/test");
const fn = require("./check");
const { now: nowCmd } = require("effects-as-data-universal").cmds;
const httpGetCmd = require("./commands/httpGet");
const { success, failure } = require("@pheasantplucker/failables");

test(
  "should check on a url",
  testFn(fn)(() => {
    const url = "http://google.com";
    const response = {
      status: 200
    };
    const start = 150;
    const end = 160;
    const result = success(response, {
      duration: end - start
    });

    return args(url)
      .yieldCmd(nowCmd())
      .yieldReturns(150)
      .yieldCmd(httpGetCmd(url))
      .yieldReturns(response)
      .yieldCmd(nowCmd())
      .yieldReturns(160)
      .returns(result);
  })
);

test(
  "should handle a failure",
  testFn(fn)(() => {
    const url = "http://google.com";
    const start = 150;
    const end = 160;
    const error = new Error("problem");
    const result = failure(error, {
      duration: end - start
    });

    return args(url)
      .yieldCmd(nowCmd())
      .yieldReturns(150)
      .yieldCmd(httpGetCmd(url))
      .yieldThrows(error)
      .yieldCmd(nowCmd())
      .yieldReturns(160)
      .returns(result);
  })
);
