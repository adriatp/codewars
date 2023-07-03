const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold=0;

function solution(list){
  let ret = '', i=0;
  while (i<list.length) {
    let j=i;
    while (j+1 < list.length && list[j+1] - list[j] <= 1)
      j++;
    if (j-i>=2) {
      ret += (',' + list[i] + '-' + list[j]);
      i=j+1;
    }
    else {
      ret += (',' + list[i]);
      i=i+1;
    }
  }
  return ret.substring(1);
}

describe("Sample Tests", () => {
  it("Should pass sample tests", () => {
    assert.deepEqual(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]), "-6,-3-1,3-5,7-11,14,15,17-20")
  });
});
