/**
 * @fileoverview 이미지 대체 텍스트에는 '이미지' 또는 '사진'이라는 문구가 중복으로 들어가면 안됩니다.
 * @author seoyoung
 */
"use strict";

const { getQuote } = require("../helpers/literal-node");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "이미지 대체 텍스트에는 '이미지' 또는 '사진'이라는 문구가 중복으로 들어가면 안됩니다.",
      recommended: false,
    },
    schema: [],
    messages: {
      noDuplicateImageSuffix:
        "대체 텍스트('{{value}}')가 '이미지' 또는 '사진'로 끝납니다.",
    },
    fixable: "code",
  },
  create(context) {
    const IsImageElement = (jsxElementNode) => {
      return jsxElementNode.openingElement.name.name === "img";
    };

    const getAttribute = (jsxElementNode, name) => {
      const attributes = jsxElementNode.openingElement.attributes;
      if (!attributes.length) {
        return;
      }
      return attributes.find((node) => node.name.name === name);
    };

    const endWithImageTextRegex = /(이미지|사진)$/g;

    const IsEndWithImageText = (text) => {
      return text.match(endWithImageTextRegex);
    };

    return {
      JSXElement(node) {
        if (!IsImageElement(node)) {
          return;
        }

        const altAttributeNode = getAttribute(node, "alt");

        if (!altAttributeNode) {
          return;
        }

        const altValueNode = altAttributeNode.value;
        const altValue = altValueNode.value;

        if (IsEndWithImageText(altValue)) {
          context.report({
            node: node,
            messageId: "noDuplicateImageSuffix",
            data: {
              value: altValue,
            },
            fix(fixer) {
              const quote = getQuote(altValueNode);
              const fixedText = altValue
                .replace(endWithImageTextRegex, "")
                .trim();

              return fixer.replaceText(altValueNode, quote + fixedText + quote);
            },
          });
        }
      },
    };
  },
};
