import Hashing from "./hashing";

class NormalHashing extends Hashing {
  private SIZE = 4;
  constructor() {
    super();
    this.nodes = this.initNodes();
  }

  private initNodes() {
    const nodes = new Map<number, string>();
    for (let i = 0; i < this.SIZE; i++) {
      nodes.set(i, `Node${i}`);
    }
    return nodes;
  }

  public getNode(key: string): string {
    const index = this.hash(key) % this.SIZE;
    return this.nodes.get(index);
  }

  public addNode(node: string): void {
    this.nodes.set(this.SIZE, node);
    this.SIZE += 1;
  }

  public removeNode(node: string): void {
    this.SIZE -= 1;
    this.nodes.delete(this.SIZE);
  }
}

export default NormalHashing;
