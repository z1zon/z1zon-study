import NormalHashing from "../../hash/normalHashing";
import HashingTestModule from "../commonTestModule";

class Case1 extends HashingTestModule<NormalHashing> {
  constructor() {
    const hashing = new NormalHashing();
    super(hashing);
  }

  run() {
    const firstRequestsResult = this.sendRequests();
    const secondRequestsResult = this.sendRequests();
    this.printResult(firstRequestsResult, secondRequestsResult);
  }

  description(): string {
    return "node 개수가 고정인 경우";
  }
}

export default Case1;
