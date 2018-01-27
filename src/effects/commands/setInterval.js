module.exports = function(fn, time) {
  return { type: "setInterval", fn, time };
};
