/**
 * @fileoverview 이미지 대체 텍스트에는 '이미지' 또는 '사진'이라는 문구가 중복으로 들어가면 안됩니다.
 * @author seoyoung
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-duplicate-img-text-to-alt"),
  RuleTester = require("eslint").RuleTester;

const parserOptions = {
  ecmaVersion: 2023,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("no-duplicate-img-text-to-alt", rule, {
  valid: [
    { code: "<img src='' />" },
    { code: "<img src='' alt='' />" },
    { code: "<img src='' alt='어쩌구' />" },
    { code: "<img src='' alt='사진을찍는사람' />" },
    { code: "<img src='' alt='이미지님의 얼굴' />" },
  ],

  invalid: [
    {
      code: "<img src='' alt='이미지' />",
      output: "<img src='' alt='' />",
      errors: [{ messageId: "noDuplicateImageSuffix" }],
    },
    {
      code: "<img src='' alt='어쩌구 이미지' />",
      output: "<img src='' alt='어쩌구' />",
      errors: [{ messageId: "noDuplicateImageSuffix" }],
    },
    {
      code: "<img src='' alt='이미지님의 얼굴 사진' />",
      output: "<img src='' alt='이미지님의 얼굴' />",
      errors: [{ messageId: "noDuplicateImageSuffix" }],
    },
  ],
});
