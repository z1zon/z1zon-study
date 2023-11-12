const getQuote = (literalNode) => {
  if (literalNode.type !== "Literal") {
    return;
  }

  return literalNode.raw[0];
};

module.exports = {
  getQuote,
};
