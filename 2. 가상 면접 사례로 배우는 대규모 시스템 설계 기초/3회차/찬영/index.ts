import { ConsistentHash } from './consistent-hash';
import { diff } from 'deep-object-diff';

// test case 1
// hash ring이 올바르게 생성 되는가?
(() => {
  console.log('================================');
  console.log('test case 1');
  const consistentHash = new ConsistentHash({ range: 99 });

  const nodes = new Array(33).fill(null).map((_, i) => `Node-${i}`);
  nodes.forEach((node) => consistentHash.addNode(node));

  console.log('Hash ring length:', consistentHash.hashRingLength);

  const key = 'Data-1';
  const node = consistentHash.findNodeByKey(key);
  console.log(`key: ${key}, node: ${node}`);
  console.log('================================');
})();

// test case 2
// 어느정도의 균등분배를 지원하는가?
(() => {
  console.log('================================');
  console.log('test case 2');
  const consistentHash = new ConsistentHash({ range: 60 });

  const nodes = new Array(20)
    .fill(null)
    .map((_, i) => `Node-${String(i).padStart(3, '0')}`);
  nodes.forEach((node) => consistentHash.addNode(node));

  const keys = new Array(10000)
    .fill(null)
    .map((_, i) => `Data-${String(i).padStart(4, '0')}`);

  const counter: Record<string, string[]> = {};

  keys.forEach((key) => {
    const node = consistentHash.findNodeByKey(key);

    counter[node] ??= [];
    counter[node].push(key);
  });
  console.log(
    Object.keys(counter)
      .sort()
      .reduce<Record<string, number>>(
        (acc, key) => ({ ...acc, [key]: counter[key].length }),
        {},
      ),
  );
  console.log('================================');
})();

// test case 3
// 서버노드가 달라져도 일부만 rehash되는가?
(() => {
  console.log('================================');
  console.log('test case 3');
  const consistentHash = new ConsistentHash({ range: 100 });

  const nodes = new Array(20)
    .fill(null)
    .map((_, i) => `Node-${String(i).padStart(3, '0')}`);
  nodes.forEach((node) => consistentHash.addNode(node));

  const keys = new Array(100)
    .fill(null)
    .map((_, i) => `Data-${String(i).padStart(4, '0')}`);

  const counterA: Record<string, string[]> = {};

  keys.forEach((key) => {
    const node = consistentHash.findNodeByKey(key);

    counterA[node] ??= [];
    counterA[node].push(key);
  });

  consistentHash.removeNode(nodes[19]);

  const counterB: Record<string, string[]> = {};
  keys.forEach((key) => {
    const node = consistentHash.findNodeByKey(key);

    counterB[node] ??= [];
    counterB[node].push(key);
  });

  console.log('updated node');
  console.log(diff(counterB, counterA));

  console.log(
    Object.keys(counterA)
      .sort()
      .reduce<Record<string, number>>(
        (acc, key) => ({ ...acc, [key]: counterA[key].length }),
        {},
      ),
  );

  console.log(
    Object.keys(counterB)
      .sort()
      .reduce<Record<string, number>>(
        (acc, key) => ({ ...acc, [key]: counterB[key].length }),
        {},
      ),
  );

  console.log('================================');
})();
