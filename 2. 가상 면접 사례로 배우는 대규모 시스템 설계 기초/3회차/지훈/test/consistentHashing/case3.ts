import ConsistentHashing from "../../hash/consistentHashing";
import HashingTestModule from "../commonTestModule";

class Case3 extends HashingTestModule<ConsistentHashing> {
  constructor() {
    const consistentHashing = new ConsistentHashing();
    super(consistentHashing);
  }

  run() {
    const firstRequestsResult = this.sendRequests();
    this.hashing.addNode("Node4");
    const secondRequestsResult = this.sendRequests();
    this.printResult(firstRequestsResult, secondRequestsResult);
  }

  description(): string {
    return "node 개수가 하나 추가된 경우";
  }
}

export default Case3;
