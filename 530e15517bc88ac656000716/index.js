const chai = require("chai");
const assert = chai.assert;

function rot13(message){
  return message.split("").map(e => {
    if (e.charCodeAt(0) >= 'a'.charCodeAt(0) && e.charCodeAt(0) <= 'z'.charCodeAt(0)) {
      return String.fromCharCode(((e.charCodeAt(0) - 'a'.charCodeAt(0) + 13) % 26) + 'a'.charCodeAt(0));
    }
    else if (e.charCodeAt(0) >= 'A'.charCodeAt(0) && e.charCodeAt(0) <= 'Z'.charCodeAt(0)) {
      return String.fromCharCode(((e.charCodeAt(0) - 'A'.charCodeAt(0) + 13) % 26) + 'A'.charCodeAt(0));
    }
      else  return e;
  }).join("")
}

describe("Tests", function() {
  it("Sample tests", function() {
    for (const [input, expected] of [["test", "grfg"], ["Test", "Grfg"], ["Ruby is cool!", "Ehol vf pbby!"]]) {
      assert.strictEqual(rot13(input), expected, `Test failed with messsage = '${input}'`);
    }
  });
});
