import Hashing from "./hashing";

class ConsistentHashing extends Hashing {
  private NODE_SIZE = 4;
  private REPLICA_SIZE = 200;

  constructor() {
    super();
    this.initNodes();
  }

  private initNodes() {
    for (let i = 0; i < this.NODE_SIZE; i++) {
      this.addNode(`Node${i}`);
    }
  }

  // 해시 링에 새로운 노드를 추가하는 함수
  addNode(node: string): void {
    for (let i = 0; i < this.REPLICA_SIZE; i++) {
      const hash = this.hash(`${node}-${i}`);
      this.nodes.set(hash, node);
    }
  }

  // 해시 링에서 노드를 제거하는 함수
  removeNode(node: string): void {
    for (let i = 0; i < this.REPLICA_SIZE; i++) {
      const hash = this.hash(`${node}-${i}`);
      if (this.nodes.has(hash)) {
        this.nodes.delete(hash);
      }
    }
  }

  // 주어진 키에 대한 노드를 가져오는 함수
  public getNode(key: string): string | null {
    if (this.nodes.size === 0) {
      return null;
    }

    const hash = this.hash(key);
    const sortedHashes = Array.from(this.nodes.keys()).sort();

    // 키 해시의 시계 방향에서 가장 가까운 노드를 반환
    for (const nodeHash of sortedHashes) {
      if (hash <= nodeHash) {
        return this.nodes.get(nodeHash)!;
      }
    }

    // 키 해시가 모든 노드 해시보다 큰 경우 첫 번째 노드를 반환
    return this.nodes.get(sortedHashes[0])!;
  }
}

export default ConsistentHashing;
