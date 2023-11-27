import { MD5 } from "crypto-js";

abstract class Hashing {
  protected nodes: Map<number, string> = new Map(); // 해시된 위치와 해당 노드를 저장하는 맵

  abstract addNode(node: string): void;
  abstract removeNode(node: string): void;
  abstract getNode(node: string): string | null;

  // 키를 MD5를 사용하여 해싱하는 함수
  protected hash(key: string): number {
    const md5Hash = MD5(key).toString();
    return parseInt(md5Hash.slice(0, 8), 16);
  }
}

export default Hashing;
