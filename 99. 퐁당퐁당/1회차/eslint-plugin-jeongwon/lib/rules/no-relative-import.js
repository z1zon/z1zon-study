"use strict";

const path = require("path");

module.exports = {
  meta: {
    docs: {
      description: "to use absolute import rather than relative import",
      recommended: true,
    },
    fixable: "true",
  },

  create: function (context) {
    return {
      ImportDeclaration: node => {
        const { options } = context;
        const baseUrl = (
          options.find(option => option.baseUrl) ?? { baseUrl: "./" }
        ).baseUrl;

        const importSource = node.source.value;

        if (importSource.startsWith("../")) {
          const filename = context.getFilename();
          const absolutePath = path.normalize(
            path.join(path.dirname(filename), importSource)
          );
          const expectedPath = path.relative(baseUrl, absolutePath);

          if (importSource !== expectedPath) {
            context.report({
              node,
              message: `Relative import is preferred in this setting. Use '${expectedPath}' instead of '${importSource}'.`,
              fix: function (fixer) {
                return fixer.replaceText(node.source, `'${expectedPath}'`);
              },
            });
          }
        }
      },
    };
  },
};
