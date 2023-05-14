function occurrences(arr, elem) {
  return arr.reduce((res,act) => {
    if (act == elem) res++;
  }, 0);
}

function money_value(s) {
  let res = s.match(/\d*\.?\d+$|^\d+\.\d*/);
  if (res === null) return 0.0;
  let number = res[0];
  let first_part = s.slice(0,res.index).split('');
  let last_part = s.slice(res.index + number.length).split('');
  if (last_part.some(e => {e != ' '})) return 0.0;
  if (first_part.some(e => {e != ' ' && e != '-' && e != '$'})) return 0.0;
  if (occurrences(first_part,'$') > 1)  return 0.0;
  if (occurrences(first_part,'-') > 1)  return 0.0;
  if (first_part.indexOf('-') > -1)     number *= -1;
  return number;
}

const Test = require('@codewars/test-compat');

/* ----------------------------------------------------------------------------------- */

function close_enough(actual, expected) {
  return Math.abs(actual - expected) < 1e-9;
}

/* ----------------------------------------------------------------------------------- */
/*                        TESTS                                                        */
/* ----------------------------------------------------------------------------------- */

describe("money_value", function(){
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("12.34"), 12.34 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value(" $5.67"), 5.67 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("-0.89"), -0.89 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("-$ 0.1"), -0.10 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("$-2.3456"), -2.3456 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("007"), 7.00 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value(" $ 89"), 89.0 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("   .11"), 0.11 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("$.2"), 0.20 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("-.34"), -0.34 ));
  });
  it("Example_Tests", function(){
    Test.expect(close_enough( money_value("$$$"), 0.0 ));
  });
});
