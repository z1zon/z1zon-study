### 웹사이트 글 정리해주는 AI 에이전트 만들기

- 웹사이트 링크를 입력하여 데이터를 스크랩하고
- faiss와 같은 백터스페이스 (데이터베이스)에 저장한 다음
- 웹사이트 데이터를 한번에 요약해주는 LLM 체인

governance proposal 을 읽고 블록체인 동향에 대해 요약해주는 AI 에이전트.

논문을 읽고 요약해주는 등 활용해도 좋을것 같다.

### LangChian이란?

- LangChain 은 2022년 10월에 등장한 오픈 소스 프레임워크.
- LLM 프롬프트의 실행과 외부 소스의 실행(계산기, 구글 검색, 슬랙 메시지 전송이나 소스코드 실행 등)을 엮어 연쇄(Chaining)하는 것
- 입력과 출력을 가지는 매개체들을 줄줄이 엮어 하나의 플로우(Flow)로 만들고, 그러한 플로우들을 또 모듈화하고 엮어서 하나의 어플리케이션으로 만들 수 있게 해주는 프레임워크

### LLMs(Large Language Models)

- LLM 모듈은 Langchain의 엔진입니다.
- 각기 다른 언어 모델 혹은 언어 모델 제공 서비스가 가진 API를 Langchain의 다른 여러 모듈에서 사용할 수 있도록 정규화한 인터페이스로 제공하는 역할을 함.

#### 참고한 글

참고글 :

- LangChain 문서
  - python 버전 : https://python.langchain.com/docs/use_cases/question_answering/quickstart
  - js 버전 : https://js.langchain.com/docs/get_started/introduction
- https://disquiet.io/@cailynyongyong/makerlog/%EC%8B%AC%EC%8B%AC%ED%95%B4%EC%84%9C-%ED%95%B4%EC%BB%A4%ED%86%A4-%EC%B0%B8%EC%97%AC%ED%95%B4%EC%84%9C-10%EB%B6%84-%EC%95%88%EC%97%90-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B3%A0-%EB%85%BC-%ED%9B%84%EA%B8%B0-1694516875341
