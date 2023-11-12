const { name, version } = require("./package.json");
const needBracesRule = require("./need-braces");

const plugin = { rules: { "need-braces": needBracesRule } };

module.exports = {
  meta: {
    name,
    version,
  },
  ...plugin,
};
