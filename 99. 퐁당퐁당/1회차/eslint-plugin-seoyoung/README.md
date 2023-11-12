# eslint-plugin-seoyoung

The plugin made by seoyoung

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-seoyoung`:

```sh
npm install eslint-plugin-seoyoung --save-dev
```

## Usage

Add `seoyoung` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["seoyoung"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "seoyoung/no-duplicate-img-text-to-alt": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                                       | Description                                       |
| :------------------------------------------------------------------------- | :------------------------------------------------ |
| [no-duplicate-img-text-to-alt](docs/rules/no-duplicate-img-text-to-alt.md) | 이미지 대체 텍스트에는 '이미지' 또는 '사진'이라는 문구가 중복으로 들어가면 안됩니다. |

<!-- end auto-generated rules list -->
