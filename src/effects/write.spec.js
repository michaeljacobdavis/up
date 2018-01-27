const { testFn, args } = require("effects-as-data/test");
const fn = require("./write");
const writeCmd = require("./commands/write");
const { success, failure } = require("@pheasantplucker/failables");

test(
  "should write successes",
  testFn(fn)(() => {
    const url = "http://google.com";
    const response = {
      url,
      status: 200,
      ok: true
    };
    const time = 100;
    const failable = success(response, {
      time
    });

    const points = [
      {
        measurement: "response_time",
        tags: { url, ok: response.ok, status: response.status },
        fields: { time }
      },
      {
        measurement: "up",
        tags: { url },
        fields: { ok: 1 }
      },
      {
        measurement: "status",
        tags: { url },
        fields: { status: response.status }
      }
    ];

    return args(failable)
      .yieldCmd(writeCmd(points))
      .returns();
  })
);

test(
  "should write failures",
  testFn(fn)(() => {
    const url = "http://google.com";
    const response = {
      url,
      status: 500,
      ok: false
    };
    const time = 100;
    const failable = failure(response, {
      time
    });

    const points = [
      {
        measurement: "response_time",
        tags: { url, ok: response.ok, status: response.status },
        fields: { time }
      },
      {
        measurement: "up",
        tags: { url },
        fields: { ok: 0 }
      },
      {
        measurement: "status",
        tags: { url },
        fields: { status: response.status }
      }
    ];

    return args(failable)
      .yieldCmd(writeCmd(points))
      .returns();
  })
);
