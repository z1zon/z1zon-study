import TestCase1 from "./case1";
import TestCase2 from "./case2";
import TestCase3 from "./case3";

export default function consistentHashingTest() {
  const testCase1 = new TestCase1();
  testCase1.run();

  const testCase2 = new TestCase2();
  testCase2.run();

  const testCase3 = new TestCase3();
  testCase3.run();
}
