# 간단한 webpack plugin 만들기

> npm에 배포하고 싶어서 타 repo에 작업 후 해당 작업 repo 주소를 첨부합니다

## repository
- https://github.com/cyjo9603/todo-log-webpack-plugin

## npm
- https://www.npmjs.com/package/todo-log-webpack-plugin

### description
- eslint 관련 작업은 팀에서 해본 경험이 있어, 경험이 없는 webpack plugin을 만들어보고 싶었음
- 기왕이면 현재 나에게 니즈가 있는 플러그인을 만들고 싶었고, 평소에 @TODO + vscode todo highlight extension을 즐겨 사용했는데, 시간이 지나면 해당 부분을 자주 놓치는 경우가 발생
- 시간이 지나도 해당 부분을 기억하기 쉽도록, 빌드시마다 TODO 주석을 작성한 내용을 로그에 표시해주는 webpack plugin 개발

### 개발하면서 느낀 점?
- 급하게 만들어서 기능도 적고, test 코드도 없는데, 나중에 조금씩 리팩터링하면서 깔끔하게 만들고 싶음
- webpack plugin 개발은 처음이었는데, 생각보다 webpack 공식 문서에 가이드가 잘 되어있어서, 다른 니즈가 있을 때도 개발할 수 있을 것 같음
- 책읽다가 퐁당퐁당 하니까 개운함