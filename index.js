const check = require("./src/check");
const config = require(process.env.UP_CONFIG);
const assert = require("assert");

assert(
  Array.isArray(config),
  "Config must be an array of tuples [url, interval]"
);

config.map(check);
