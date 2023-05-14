function zeroPlentiful(arr){
    let i=0; 
    let zero_series = 0;
    while(i<arr.length) {
        if (arr[i] == 0) { 
            let zero_count = 0;
            while (i<arr.length && arr[i] == 0) {
                i++; zero_count++;
            }
            if (zero_count >= 4)    zero_series++;
            else                    return 0;
        }
        else
            i++;
    }
    return zero_series;
}


const { strictEqual } = require('chai').assert;

function doTest(array, expected) {
	const log = `for array : [${array}]\n`;
	const actual = zeroPlentiful(array);
	strictEqual(actual, expected, log);
}

describe("zero-plentiful Array", () => {
	it("sample tests", () => {
		doTest([0, 2, 0, 0, 0, 0, 3, 4, 5, 0, 0, 0, 0, 0], 0);
		doTest([3], 0);
		doTest([0, 0, 0, 0, 0, 0], 1);
		doTest([0, 2, 19, 4, 4], 0);
		doTest([1, 0, 0, 0, 0, 5, 4, 0, 0, 0, 0, 0], 2);
		doTest([-3, 2, 1, 3, -1, -2], 0);
		doTest([1000, 0, 1, 0, 0, 0, 0], 0);
		doTest([10, 0, 0, 0], 0);
		doTest([], 0);
	});
});