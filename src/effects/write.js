const writeCmd = require("./commands/write");
const {
  isSuccess,
  isFailure,
  payload,
  meta
} = require("@pheasantplucker/failables");

const handleFailable = failable => {
  const { duration } = meta(failable);
  const { url, ok, status } = payload(failable);
  return [
    {
      measurement: "response_time",
      tags: { url, ok, status },
      fields: { duration }
    },
    {
      measurement: "up",
      tags: { url },
      fields: { ok: Number(ok) }
    },
    {
      measurement: "status",
      tags: { url },
      fields: { status }
    }
  ];
};

module.exports = function*(failable) {
  yield writeCmd(handleFailable(failable));
};
