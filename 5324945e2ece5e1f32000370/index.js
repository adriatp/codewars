const Test = require('@codewars/test-compat');

function sumStrings(a,b) {
  if (a.length < b.length) a = '0'.repeat(b.length - a.length) + a;
  if (b.length < a.length) b = '0'.repeat(a.length - b.length) + b;
  let ret = '', carry = 0;
  for (let i=a.length-1; i>=0; i--) {
    let c = (+a[i] + +b[i] + carry) + '';
    carry = c.length == 1 ? 0 : 1;
    ret = c.charAt(c.length - 1) + ret;
  };
  ret = carry == 0 ? ret : '1' + ret;
  while (ret.length > 1 && ret[0] == '0') ret = ret.substring(1);
  return ret;
}

describe("Tests", () => {
  it("test", () => {
    Test.assertEquals(sumStrings('123','456'),'579');
    Test.assertEquals(sumStrings('712569312664357328695151392','8100824045303269669937'),'712577413488402631964821329');
    Test.assertEquals(sumStrings('800','9567'),'10367');
    Test.assertEquals(sumStrings('00103','08567'),'8670');
  });
});
