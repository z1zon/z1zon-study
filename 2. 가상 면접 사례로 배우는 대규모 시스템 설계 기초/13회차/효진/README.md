# 15장. 구글 드라이브 설계

**API**

1. 파일 업로드 API
   - 단순 업로드: 파일 크기가 작을 때 사용
   - 이어 올리기: 파일 사이즈가 크고, 네트워크 문제로 업로드 중단 가능성이 있을 때 사용
2. 파일 다운로드 API
3. 파일 갱신 히스토리 API

## 개략적 설계

![[Pasted image 20240520203818.png]]

- 블록 저장소 서버: 파일 블록을 클라우드 저장소에 업로드 하는 서버. 파일을 여러개의 블록으로 나눠 저장, 각 블록에는 고유한 해시값 할당, 해시값은 메타데이터 데이터베이스에 저장됨.
- 아카이빙 저장소: 오랫동안 사용되지 않은 비활성 데이터를 저장하는 곳
- 메타데이터 DB: 사용자, 파일, 블록, 버전 등의 메타데이터 정보 관리
- 메타데이터 캐시: 자주쓰이는 메타데이터를 캐시하여 성능 향상
- 오프라인 사용자 백업 큐: 클라이언트가 접속 중이 아니라 최신 상태를 확인할 수 없을 때 해당 정보를 이 큐에 두어 나중에 접속 시에 동기화

## 상세 설계

**블록 저장소 서버**
용량이 큰 파일의 경우 전체 파일을 서버로 보내면 네트워크 대역폭을 많이 잡아먹음 → 최적화 필요

- 델타 동기화: 파일 수정 시 수정이 일어난 블록만 동기화
- 압축: 블록 단위로 압축하여 데이터 크기를 줄임, 압축 알고리즘은 파일 유형에 따라 정함 → 파일을 블록 단위로 분할 + 압축 + 암호화 하여 업로드, 수정된 블록만 전송

**높은 일관성**
같은 파일이 단말이나 사용자에 따라 다르게 보이면 안됨
→ 캐시에 보관된 사본과 데이터베이스의 원본이 일치, 원본에 변경 발생 시 캐시 사본 무효화

- RDB는 강한 일관성 기본 보장, NoSQL은 기본 X → RDB 채택

**업로드 절차**
메타데이터 추가 요청과 클라우드 저장소 업로드 요청이 병렬적으로 전송

- 메타데이터 추가
  - 메타데이터를 DB에 저장하고 업로드 상태를 대기중으로 변경
  - 새 파일이 추가되었음을 알림 서비스에 통지
- 클라우드 저장소 업로드
  - 블록 저장소 서버는 파일을 블록 단위로 분할, 압축, 암호화 후 클라우드 저장소로 전송
  - 업로드 완료 후 클라우드 스토리지는 완료 콜백을 호출, API 서버로 전송
  - 메타데이터 DB의 파일 업로드 상태를 완료로 변경
  - 파일 업로드가 끝났음을 알림 서비스에 통지

**다운로드 절차**

1. 알림 서비스가 클라이언트2에게 누군가 파일 변경했음을 알림
2. 알림을 확인한 클라이언트2는 새로운 메타데이터를 요청하여 받아옴
3. 클라이언트2는 메타데이터를 받자마자 블록 다운로드 요청 전송
4. 블록 저장소 서버는 요청한 블록을 클라우드 저장소에서 가져와서 반환
5. 클라이언트2는 전송된 블록을 사용하여 파일 재구성

- 다운로드는 파일 추가 or 편집 시 시작 → 다른 클라이언트가 파일 편집 or 추가 시 감지 방법은?
  - 접속중이면 알림 서비스가 알림
  - 접속중이 아니면 데이터는 캐시 보관, 접속 시 알림

**알림 서비스**
롱 폴링 vs 웹소켓 → 롱 폴링

- 양방향 통신이 필요하지 않음(서버는 파일이 변경된 사실을 클라이언트에게 알려야함 but 반대 방향의 통신은 필요 X)
- 알림을 보낼 일은 자주 발생하지 않고, 보낸다 해도 단시간에 많은 양을 보낼 일은 없음
- 롱 폴링을 쓰게되면 각 클라이언트는 알림 서버와 롱 폴링용 연결을 유지하다가 파일 변경 감지 시 연결을 끊음 → 클라이언트는 메타데이터 서버와 연결해 파일의 최신 내역 다운로드 다운로드 끝 or 타임아웃 시 즉시 새 요청을 보내어 롱 폴링 연결 복원 및 유지

**저장소 공간 절약**
안정성을 위해 여러 백업본을 저장해야함 → 저장용량 소진이 너무 빠름

- 중복 제거: 종복된 파일 블록을 계정 차원에서 제거. 해시 값을 비교하여 같은 블록인지 판별
- 지능적 백업 전략 도입
  - 한도 설정: 보관할 파일 버전 개수에 상한을 두고 상한 도달 시 가장 오래된 버전 제거
  - 중요한 버전만 보관: 업데이트가 자주되는 파일의 경우 업데이트 마다 새로운 버전으로 관리한다면 너무 많은 버전이 만들어짐 → 중요한 버전만 골라야함
- 아카이빙 저장소 활용: 자주 쓰이지 않는 데이터는 아카이빙 저장소로 옮김 → 이용료가 훨씬 저렴
