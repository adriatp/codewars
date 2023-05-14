const chai = require("chai");
const assert = chai.assert;

function hasSurvived(attackers, defenders){
    let survivors_attackers=0, survivors_defenders=0, ip_attackers=0, ip_defenders=0; 
    for (let i=0; i<Math.max(attackers.length, defenders.length); i++) {
        if (attackers.length-1 < i)
            survivors_defenders++;
        else if (defenders.length-1 < i)
            survivors_attackers++;
        else if (attackers[i] > defenders[i])
            survivors_attackers++;
        else if (attackers[i] < defenders[i])
            survivors_defenders++;
        if (i < attackers.length)
            ip_attackers += attackers[i];
        if (i < defenders.length)
            ip_defenders += defenders[i];
    }
    return survivors_defenders > survivors_attackers || (survivors_defenders == survivors_attackers && ip_defenders >= ip_attackers);
}

describe("Solution", function() {
  it("Basic Tests", function() {
    assert.strictEqual(hasSurvived([2, 9, 9, 7], [1, 1, 3, 8]), false);
    assert.strictEqual(hasSurvived([1, 3, 5, 7], [2, 4, 6, 8]), true);
    assert.strictEqual(hasSurvived([10, 10, 1, 1], [4, 4, 7, 7]), true);
    assert.strictEqual(hasSurvived([], [1, 2, 3]), true);
    assert.strictEqual(hasSurvived([1, 2, 3], []), false);
    assert.strictEqual(hasSurvived([32, 65, 21, 83, 85, 7, 71, 45, 20, 63], [83, 44, 38, 55, 84, 80, 58, 20, 4, 74]), false);
  });
});