module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: 'Include braces in "if" or "for" syntax.',
    },
    fixable: true,
  },
  create(context) {
    return {
      "IfStatement[consequent.type!='BlockStatement']": function (node) {
        context.report({
          node,
          message: '"if" syntax must contain braces.',
          data: {},
          *fix(fixer) {
            yield fixer.insertTextBefore(node.consequent, "{");
            yield fixer.insertTextAfter(node.consequent, "}");
          },
        });
      },
      "ForStatement[body.type!='BlockStatement']": function (node) {
        context.report({
          node,
          message: '"for" syntax must contain braces.',
          data: {},
          *fix(fixer) {
            yield fixer.insertTextBefore(node.body, "{");
            yield fixer.insertTextAfter(node.body, "}");
          },
        });
      },
    };
  },
};
