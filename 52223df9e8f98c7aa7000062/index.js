function rot13(str) {
    let rot = (actual_char, init_char, final_char, rot_num) => {
        if (actual_char.charCodeAt(0) >= init_char.charCodeAt(0) && actual_char.charCodeAt(0) <= final_char.charCodeAt(0)) {
            if (actual_char.charCodeAt(0) + rot_num <= final_char.charCodeAt(0))
                return String.fromCharCode(actual_char.charCodeAt(0) + rot_num);
            else
                return String.fromCharCode(init_char.charCodeAt(0) + actual_char.charCodeAt(0) + rot_num - final_char.charCodeAt(0) - 1);
        }
        return actual_char;
    }
    return [...str].map(e => {
        let roted = rot(e,'a','z',13)
        if (roted == e) roted = rot(e,'A','Z',13);
        return roted;
    }).join('')
}

const assert = require("chai").assert;

describe("Sample tests", () => {
  it("should work for 'EBG13 rknzcyr.'", () => 
    assert.strictEqual(rot13("EBG13 rknzcyr."), "ROT13 example.")
  );
  it("should work for 'This is my first ROT13 excercise!'", () => 
    assert.strictEqual(rot13("This is my first ROT13 excercise!"), "Guvf vf zl svefg EBG13 rkprepvfr!")
  );
});
