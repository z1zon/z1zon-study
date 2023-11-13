# eslint-plugin-jeongwon

Custom rules for Jeongwon

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-jeongwon`:

```
$ npm install eslint-plugin-jeongwon --save-dev
```

## Usage

Add `jeongwon` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["jeongwon"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "jeongwon/no-relative-import": "error"
  }
}
```

## Supported Rules

- Fill in provided rules here
