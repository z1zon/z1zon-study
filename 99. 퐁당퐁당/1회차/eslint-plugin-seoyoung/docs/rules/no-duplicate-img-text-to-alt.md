# 이미지 대체 텍스트에는 '이미지' 또는 '사진'이라는 문구가 중복으로 들어가면 안됩니다 (`seoyoung/no-duplicate-img-text-to-alt`)

<!-- end auto-generated rule header -->

이미지 대체 텍스트에는 '이미지' 또는 '사진'이라는 접미사를 사용하지 않습니다.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<img src='' alt='이미지' />
<img src='' alt='어쩌구 이미지' />
<img src='' alt='이미지님의 얼굴 사진' />
```

Examples of **correct** code for this rule:

```js
<img src='' alt='강아지' />
<img src='' alt='어쩌구' />
<img src='' alt='이미지님의 얼굴' />
```
