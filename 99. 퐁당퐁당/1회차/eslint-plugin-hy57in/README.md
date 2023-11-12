# eslint-plugin-no-test-console

Disallow the use of &#39;console&#39; for test

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-test-console`:

```sh
npm install eslint-plugin-no-test-console --save-dev
```

## Usage

Add `no-test-console` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-test-console"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-test-console/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


