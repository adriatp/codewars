function buyTofu(cost,box){
  let money = box.split(" ").reduce((acc,val) => {
    if (val === "mon")    return [acc[0]+1,acc[1]];
    if (val === "monme")  return [acc[0],acc[1]+1];
    return acc;
  }, [0,0]);
  let coins = 0, mon = money[0], monme = money[1];
  while (cost - 60 >= 0 && monme > 0) {
    monme--;
    cost-=60;
    coins++;
  }
  while (cost - 1 >= 0 && mon > 0) {
    mon--;
    cost--;
    coins++;
  }
  if (cost != 0) return "leaving the market";
  return [money[0], money[1], money[0] + 60 * money[1], coins];
}

const { assert } = require('chai');

describe("Sample tests", () => {
  const testCases = [
    ["leaving the market", 5, "mon monme"],
    [[45, 5, 345, 6], 124, "mon mon mon mon mon apple mon mon mon mon mon mon mon monme mon mon monme mon mon mon mon cloth monme mon mon mon mon mon mon mon mon cloth mon mon monme mon mon mon mon monme mon mon mon mon mon mon mon mon mon mon mon mon mon"],
    ["leaving the market", 674, "mon mon mon"],
    [[2,2,122,1], 1, "monme mon mon monme"],
    [[2,2,122,4], 122, "monme mon mon monme"],
    [[121, 1, 181, 65], 124, "mon mon mon mon mon apple mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon monme mon mon mon mon cloth mon mon mon mon mon mon mon mon mon cloth mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon"]
  ];
  for(let [expected, cost, box] of testCases)
    it(`cost = ${cost}, box = "${box}"`, () => assert.deepEqual(buyTofu(cost, box), expected));
});