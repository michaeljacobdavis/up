const { testFn, args } = require("effects-as-data/test");
const fn = require("./execute");
const { call } = require("effects-as-data-universal").cmds;
const { success } = require("@pheasantplucker/failables");
const check = require("./check");
const write = require("./write");

test(
  "should execute",
  testFn(fn)(() => {
    const url = "http://google.com";
    const response = success();

    return args(url)
      .yieldCmd(call(check, url))
      .yieldReturns(response)
      .yieldCmd(call(write, response))
      .returns();
  })
);
