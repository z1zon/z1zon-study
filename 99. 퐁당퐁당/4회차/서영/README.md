# Builder Pattern

## 실제 사용 예시

- http와 https에 내장된 request() API로 HTTP(S) 클라이언트 요청을 생성
  - https://nodejs.org/api/http.html#http_http_request_url_options_callback
- 실제로 많이 사용하는 HTTP(S) 요청에 대한 래퍼 중 하나인 superagent

  ```jsx
  import superagent from "superagent";

  superagent
    .post("https://example.com/api/person")
    .send({ name: "John Doe", role: "user" })
    .set("accept", "json")
    .then((response) => {});
  ```

- Query Builder

  - `QueryBuilder` is one of the most powerful features of TypeORM - it allows you to build SQL queries using elegant and convenient syntax, execute them and get automatically transformed entities. (https://orkhan.gitbook.io/typeorm/docs/select-query-builder)
    ```jsx
    const firstUser = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: 1 })
      .getOne();
    ```
    ```jsx
    SELECT
        user.id as userId,
        user.firstName as userFirstName,
        user.lastName as userLastName
    FROM users user
    WHERE user.id = 1
    ```
    ```jsx
    User {
        id: 1,
        firstName: "Timber",
        lastName: "Saw"
    }
    ```
  - ex

    ```jsx
    export const orderByTilCount = async (count: number) => {
      const rows = await AngmondDataSource.getRepository(Til)
        .createQueryBuilder("til")
        .select("til.userId")
        .addSelect("Count(*) AS tilCount")
        .orderBy("tilCount", "DESC")
        .groupBy("til.userId")
        .take(count)
        .getRawMany();

      return rows.map((row: { userId: string, tilCount: string }) => {
        return {
          userId: row.userId,
          tilCount: row.tilCount,
        };
      });
    };
    ```

### Refs

- https://minu0807.tistory.com/145

## 구현해보기

https://www.apple.com/kr/macbook-air/

```jsx
class MacBook {
  chip: string = "";
  cpu: number = 0;
  gpu: number = 0;
  memory: number = 0;

  constructor() {}

  getInfo() {
    console.log(
      `${this.chip} 맥북 - cpu: ${this.cpu}코어 gpu: ${this.gpu}코어, memory: ${this.memory}TB`
    );
  }
}

interface MacBookBuilder {
  reset: () => void;
  setChip: (chip: string) => void;
  setCPU: (cpu: number) => void;
  setGPU: (gpu: number) => void;
  setMemory: (memory: number) => void;
  getProduct: () => MacBook;
}

class MacBookAirBuilder implements MacBookBuilder {
  private product: MacBook = new MacBook();

  constructor() {
    this.reset();
  }

  reset() {
    this.product = new MacBook();
  }

  setChip(chip: string) {
    this.product.chip = chip;
  }
  setCPU(cpu: number) {
    this.product.cpu = cpu;
  }
  setGPU(gpu: number) {
    this.product.gpu = gpu;
  }
  setMemory(memory: number) {
    this.product.memory = memory;
  }
  getProduct() {
    const product = this.product;
    this.reset();
    return product;
  }
}

class Director {
  makeMacBookM1(builder: MacBookBuilder) {
    builder.reset();
    builder.setChip("M1");
    builder.setCPU(8);
    builder.setGPU(7);
    builder.setMemory(16);
    return builder.getProduct();
  }
  makeMacBookM2(builder: MacBookBuilder) {
    builder.reset();
    builder.setChip("M2");
    builder.setCPU(8);
    builder.setGPU(10);
    builder.setMemory(16);
    return builder.getProduct();
  }
  makeMacBookM3(builder: MacBookBuilder) {
    builder.reset();
    builder.setChip("M3");
    builder.setCPU(8);
    builder.setGPU(10);
    builder.setMemory(16);
    return builder.getProduct();
  }
}

const director = new Director();

const builder = new MacBookAirBuilder();
const macBookM1 = director.makeMacBookM1(builder);
macBookM1.getInfo(); // M1 맥북 - cpu: 8코어, gpu: 7코어, memory: 16GB

const macBookM2 = director.makeMacBookM2(builder);
macBookM2.getInfo(); // M2 맥북 - cpu: 8코어, gpu: 10코어, memory: 16GB

const macBookM3 = director.makeMacBookM3(builder);
macBookM3.getInfo(); // M3 맥북 - cpu: 8코어, gpu: 10코어, memory: 16GB
```
