import NormalHashing from "../../hash/normalHashing";
import HashingTestModule from "../commonTestModule";

class Case2 extends HashingTestModule<NormalHashing> {
  constructor() {
    const hashing = new NormalHashing();
    super(hashing);
  }

  run() {
    const firstRequestsResult = this.sendRequests();
    this.hashing.removeNode("Node3");
    const secondRequestsResult = this.sendRequests();
    this.printResult(firstRequestsResult, secondRequestsResult);
  }

  description(): string {
    return "node 개수가 하나 줄어든 경우";
  }
}

export default Case2;
