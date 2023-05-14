function brainLuck(code, input){
  let code_pointer = 0;
  let input_pointer = 0
  let data = [0];
  let data_pointer = 0;
  let output = '';
  while (code_pointer < code.length) {
    let code_char = code[code_pointer];
    switch (code_char) {
      case '>':
        data_pointer++;
        if (data_pointer == data.length)
          data.push(0);
      break;
      case '<':
        if (data_pointer == 0)
          data.unshift(0);
        else
          data_pointer--;
      break;
      case '+':
        data[data_pointer] = (data[data_pointer] + 1) % 256;
      break;
      case '-':
        data[data_pointer] = (data[data_pointer] - 255) % 256;
      break;
      case ',':
        data[data_pointer] = input.charCodeAt(input_pointer);
        input_pointer++;
      break;
      case '.':
        output += String.fromCharCode(data[data_pointer]);
      break;
      case '[':
        if (data[data_pointer] == 0) {
          let par = 1;
          while(par != 0) {
            code_pointer++;
            if (code[code_pointer] == '[')
              par++;
            else if (code[code_pointer] == ']')
              par--;
          }
        }
      break;
      case ']':
        if (data[data_pointer] != 0) {
          let par = 1;
          while(par != 0) {
            code_pointer--;
            if (code[code_pointer] == ']')
              par++;
            else if (code[code_pointer] == '[')
              par--;
          }
        }
      break;
    }
    code_pointer++;
  }
  return output;
}

const Test = require('@codewars/test-compat');

describe("Tests", () => {
  it("test", () => {
    // Echo until byte(255) encountred
    Test.assertEquals(
      brainLuck(',+[-.,+]','Codewars'+String.fromCharCode(255)), 
      'Codewars'
    );

    // Echo until byte(0) encountred
    Test.assertEquals(
      brainLuck(',[.[-],]','Codewars'+String.fromCharCode(0)), 
      'Codewars'
    );

    // Two numbers multiplier
    Test.assertEquals(
      brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8,9)), 
      String.fromCharCode(72)
    );
  });
});
