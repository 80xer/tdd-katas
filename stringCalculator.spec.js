const { expect } = require("@jest/globals");
const { add: sut } = require("./stringCalculator");

describe("String calculator", () => {
  function makeTest(source, expected) {
    test(`"${source}" => ${expected}`, () => {
      const result = sut(source.replace("\\n", "\n"));
      expect(result).toBe(expected);
    });
  }

  describe("기본 기능", () => {
    makeTest("", 0);
    makeTest("1", 1);
    makeTest("1,2", 3);
    makeTest("1,2,3,4,5,6,7,8,9,10", 55);
  });

  describe("뉴라인도 구분자로 사용할 수 있다.", () => {
    makeTest("1\\n2,3", 6);
    makeTest("1,\\n", 1);
  });

  describe("커스텀 구분자를 사용할 수 있다.", () => {
    makeTest("//[;]\\n1;2", 3);
    makeTest("//[@@]\\n1@@2@@3", 6);
  });

  describe("음수는 지원하지 않는다.", () => {
    test("1,-2,-3", () => {
      try {
        const result = sut("1,-2,-3");
        expect(result).toBe(null);
      } catch (e) {
        expect(e.message).toBe("음수는 지원하지 않습니다.(-2,-3)");
      }
    });
  });

  describe("1000보다 큰 숫자는 무시한다.", () => {
    makeTest("2,1001", 2);
    makeTest("2,3,10001", 5);
  });

  describe("여러 커스텀 구분자를 지원한다.", () => {
    makeTest("//[O][%]\n1O2%3O4", 10);
    makeTest("//[*][%]\n1*2%3*4", 10);
  });
});
