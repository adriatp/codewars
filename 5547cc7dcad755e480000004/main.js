function removeNb (n) {
  let list_1 = [];
  let pa = (n+1)*(n/2);
  for (let i=1; i<n; i++) {
    let j = (pa-i)/(i+1);
    if (Number.isInteger(j) && j <= n) {
      list_1.push([i,j]);
    }
  }
  return list_1;
}

const Test = require('@codewars/test-compat');

describe("Tests", () => {
  it("test", () => {
    Test.assertDeepEquals(removeNb(26), [[15,21], [21,15]]);
    Test.assertDeepEquals(removeNb(100), []);
  });
});
