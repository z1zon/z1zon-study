# react 19 정리

## 주 변화

### concurrent rendering

- react18이 synchronous rendering에 의존했던것과 달리, react19는 동시성을 활용해, UI 업데이트를 더 작은 비동기 작업으로 세분화함
- 우선순위가 높은 업데이트를 먼저 처리해 더 매끄럽고 유연한 사용자 경험을 제공함

### suspense for data fetching reinvented

- 데이터를 불러올때 사용하는 suspense에 대한 성능 개선
- suspense가 concurrent rendering과 원활하게 통합되기 때문에 최적의 성능을 위해 데이터를 가져오는 작업과 렌더링을 동시에 진행할 수도 있음

### server side rendering 개선

- streaming과 concurrent가 발전했다는 점을 활용해 더 빠른 TTFB와 향상된 SEO 성능을 제공함

> TTFB: Time to First Byte로 브라우저가 페이지를 요청한 시점과 서버로부터 첫 번째 정보 byte를 수신한 시점 사이의 시간

### 점진적 도입 가능

- 기존 react 생태계가 다양하다는 사실을 인지하고, 개발자가 react 프로젝트를 점진적으로 upgrade할 수 있음

### performance optimization

- react19는 runtime 효율은 높이고 번들 사이즈는 줄이기 위해 다양한 성능 최적화 기술을 사용함
- 최적화된 조정 알고리즘부터 지연 컴포넌트 로딩에 이르기까지, 더 빠른 렌더링과 효율적인 메모리 관리 기능을 제공하기 위해 노력
- 새로운 scheduler architecture를 도입해, 렌더링 우선순위와 resource활용도를 세밀하게 제어하고 성능 튜닝을 강화할 수 있도록 도움

### debugging developer tool

- react19를 사용하는 개발자는 component life cycle, state management, performance bottleneck 등에 대한 상세한 insight를 확보하고, 앱을 보다 효과적으로 최적화 할 수 있음
- time-slicing profiler와 flame charts와 같은 기능을 통해 이전보다 향상된 정밀도로 성능 관련 문제를 진단하고 해결하도록 지원

#### time-slicing profiler

#### flame chart

### 핵심 기능

#### react compiler (experimental)

- react를 더 작고 최적화된 javascript로 compile함으로써, TTFB 및 UX 개선할 수 있음
- 아직 experimental 단계로, 널리 사용할 준비는 되어있지 않음

#### reference

- https://kmong.com/article/1852--React-19-%EC%B5%9C%EC%8B%A0-%EA%B8%B0%EB%8A%A5-%ED%95%9C%EB%88%88%EC%97%90-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
