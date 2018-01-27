const check = require("./src/check");

const tests = [
  ["http://google.com/zzzzzzzzzzzzzzzzz", 1000],
  ["http://walmart.com/zzzzzzzzzzzzz", 1000]
];

tests.map(check);
