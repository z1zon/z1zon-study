import murmurhash from 'murmurhash';

interface ConsistentHashOptions {
  replicaCount?: number;
  salt?: string;
  range: number;
}

export class ConsistentHash<Node = string> {
  private nodes: Node[] = [];
  private nodeMap = new Map<number, { replicaKey: string; node: Node } | null>();

  private replicaSize: number;
  private salt: string;
  private range: number;

  private DEFAULT_REPLICA_SIZE = 3;
  private DEFAULT_SALT = '';

  constructor({ replicaCount, salt, range }: ConsistentHashOptions) {
    this.replicaSize = replicaCount || this.DEFAULT_REPLICA_SIZE;
    this.salt = salt || this.DEFAULT_SALT;
    this.range = range;
  }

  public addNode(node: Node) {
    this.nodes.push(node);

    const replicaKeys = this.getReplicaKeys(node);
    replicaKeys.forEach((replicaKey) => {
      let hashKey = this.hash(replicaKey);

      for (let i = 0; i < this.range; i++, hashKey++) {
        if (hashKey >= this.range) {
          hashKey -= this.range;
        }

        if (!this.nodeMap.get(hashKey)) {
          this.nodeMap.set(hashKey, { replicaKey, node });
          return;
        }
      }

      throw Error('Error: Exceeded the allowed range');
    });

    this.sortNodeMap();
  }

  public removeNode(node: Node) {
    this.nodes = this.nodes.filter((_node) => _node !== node);

    const replicaKeys = this.getReplicaKeys(node);
    replicaKeys.forEach((replicaKey) => {
      const hashKey = this.hash(replicaKey);

      this.nodeMap.set(hashKey, null);
    });
  }

  public findNodeByKey(key: string) {
    const keys = [...this.nodeMap.keys()];
    let hashKey = this.hash(`${key}`) % keys.length;

    for (let i = 0; i < this.range; i++, hashKey++) {
      if (hashKey >= this.range) {
        hashKey -= this.range;
      }

      const { node } = this.nodeMap.get(hashKey) || {};

      if (node) {
        return node;
      }
    }

    return 'null';
  }

  public get hashRingLength() {
    return this.nodeMap.size;
  }

  private hash(value: string) {
    return murmurhash.v3(`${value}${this.salt}`) % this.range;
  }

  private sortNodeMap() {
    this.nodeMap = new Map(
      [...this.nodeMap.entries()].sort(([aKey], [bKey]) => aKey - bKey),
    );
  }

  private getReplicaKeys(node: Node) {
    const replicaNumberLength = Math.max(String(this.replicaSize).length, 3);

    return new Array(this.replicaSize)
      .fill(null)
      .map((_, i) => `${node}-${String(i).padStart(replicaNumberLength, '0')}`);
  }
}
