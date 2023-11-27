import NormalHashing from "../../hash/normalHashing";
import HashingTestModule from "../commonTestModule";

class Case3 extends HashingTestModule<NormalHashing> {
  constructor() {
    const hashing = new NormalHashing();
    super(hashing);
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
