const { RuleTester } = require("eslint");
const needBracesRule = require("./need-braces");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run(
  "need-braces", // rule name
  needBracesRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: "() => { if (isValid) { return true; } }",
      },
      {
        code: "() => { for (let i = 0; i < 5; i++) { console.log('num : ', i); } }",
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: "() => { if (isValid) return false; }",
        output: "() => { if (isValid) {return false;} }",
        errors: 1,
      },
      {
        code: "for (let i = 0; i < 5; i++) console.log('num : ', i);",
        output: "for (let i = 0; i < 5; i++) {console.log('num : ', i);}",
        errors: 1,
      },
    ],
  }
);
