import Hashing from "../hash/hashing";

type TestResultType = {
  [node: string]: {
    count: number;
    cacheHits: number;
    cacheMisses: number;
    hitRate: number;
  };
};

abstract class HashingTestModule<T extends Hashing> {
  private keys: string[] = [];
  private cacheMaps: Map<string, string> = new Map();
  private requestCount: number = 1000;
  protected hashing: T;

  constructor(hahsing: T) {
    this.hashing = hahsing;
    this.keys = this.generateKeys();
    this.cacheMaps = this.initializeCacheMaps(this.keys);
  }

  abstract run(): void;
  abstract description(): string;

  private initializeCacheMaps(keys: string[]) {
    const cacheMaps: Map<string, string> = new Map();
    keys.forEach((key) => {
      const node = this.hashing.getNode(key);
      cacheMaps.set(key, node);
    });
    return cacheMaps;
  }

  private generateKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.requestCount; i++) {
      keys.push(`key${Math.random().toString(36)}`);
    }
    return keys;
  }

  private addCacheHit(node: string, result: TestResultType) {
    if (!result[node]) {
      return {
        ...result,
        [node]: {
          count: 0,
          cacheHits: 1,
          cacheMisses: 0,
          hitRate: 0,
        },
      };
    }
    return {
      ...result,
      [node]: {
        ...result[node],
        cacheHits: result[node].cacheHits + 1,
      },
    };
  }

  private addCacheMisses(node: string, result: TestResultType) {
    if (!result[node]) {
      return {
        ...result,
        [node]: {
          count: 0,
          cacheHits: 0,
          cacheMisses: 1,
          hitRate: 0,
        },
      };
    }
    return {
      ...result,
      [node]: {
        ...result[node],
        cacheMisses: result[node].cacheMisses + 1,
      },
    };
  }

  private isCacheHit(key: string, node: string): boolean {
    return this.cacheMaps.get(key) === node;
  }

  private calculateHitRate(result: TestResultType): TestResultType {
    Object.keys(result).forEach((node) => {
      const { cacheHits, cacheMisses } = result[node];
      result = {
        ...result,
        [node]: {
          ...result[node],
          count: cacheHits + cacheMisses,
          hitRate: Math.floor((cacheHits / (cacheHits + cacheMisses)) * 100),
        },
      };
    });
    return result;
  }

  protected sendRequests(): TestResultType {
    let result: TestResultType = {};
    this.keys.forEach((key) => {
      const node = this.hashing.getNode(key);
      if (this.isCacheHit(key, node)) {
        result = this.addCacheHit(node, result);
      } else {
        result = this.addCacheMisses(node, result);
      }
    });
    return result;
  }

  protected printResult(
    firstRequestsResult: TestResultType,
    secondRequestsResult: TestResultType
  ): void {
    const calculatedFirstRequests = this.calculateHitRate(firstRequestsResult);
    const calculatedSecondRequests =
      this.calculateHitRate(secondRequestsResult);

    console.log("------------------------------------------------------------");
    console.log();
    console.log(this.description());
    console.log("firstRequests :", calculatedFirstRequests);
    console.log("secondRequests :", calculatedSecondRequests);
    console.log();
    console.log("------------------------------------------------------------");
  }
}

export default HashingTestModule;
