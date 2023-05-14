/*
function solution(words) {
    //  Generamos el mapa de recuento de letras iniciales
    let start_map = words.map(e => {
        return e[0];
    }).reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});
    //  Generamos el mapa de recuento de letras finales
    let end_map = words.map(e => {
        return e[e.length-1];
    }).reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});
    Object.keys(start_map).forEach(e => {
        let aux = start_map[e];
        if (e in end_map) {
            start_map[e] = start_map[e] - end_map[e];
            end_map[e] = end_map[e] - aux;
        }
    });
    //  Devuelve falso si algun elemento es mayor a 1
    if (Object.keys(start_map).some(e => {start_map[e] != 0 && start_map[e] != -1 && start_map[e] != 1})) return false;
    if (Object.keys(end_map).some(e => {end_map[e] != 0 && end_map[e] != -1 && end_map[e] != 1})) return false;
    //  Devuelve falso si hay más de un 1
    let filtered_start_map = Object.fromEntries(
        Object.entries(start_map).filter(
          ([_, value]) => value == 1
        )
    );
    let filtered_end_map = Object.fromEntries(
        Object.entries(end_map).filter(
          ([_, value]) => value == 1
        )
    );
    return Object.values(filtered_start_map).length <= 1 && Object.values(filtered_end_map).length <= 1;
}
*/

var permuteUnique = function(nums) {
    var res = {}, maxLength = nums.length;

    var backtrack = function(nums, path) {
        if (path.length === maxLength) {
            const key = path.join("");
            if (!res[key]) res[key] = path.concat();
        } else {
            for (var i = 0; i < nums.length; i++) {
                path.push(nums[i]);
                backtrack(nums.filter((item, index) => index !== i), path);
                path.pop();
            }
        }
    }

    backtrack(nums, []);
    return Object.values(res);;
};

function solution(words) {
    let a = permuteUnique(words);
    for (let i=0; i<a.length; i++) {
        if (a[i].length == words.length) {
            let j=1, found = true;
            while (j<a[i].length && a[i][j-1][a[i][j-1].length-1] == a[i][j][0])
                j++;
            if (j == a[i].length)
                return true;
        }
    }
    return false;
}

const chai = require("chai")
const assert = chai.assert
chai.config.truncateThreshold = 0

describe("Fixed test cases", function() {
  it("True test in description", function() {
    assert.strictEqual(solution(["excavate", "endure", "desire", "screen", "theater", "excess", "night"]), true)
  })
  it("False test in description", function() {
    assert.strictEqual(solution(["trade", "pole", "view", "grave", "ladder", "mushroom", "president"]), false)
  })
  it("Five words", function() {
    assert.strictEqual(solution(["screen", "desire", "theater", "excess", "night"]), true)
  })
  it("Four words", function() {
    assert.strictEqual(solution(["engine", "endure", "elite", "excess"]), true)
  })
  it("One letter words", function() {
    assert.strictEqual(solution(["east", "e", "e", "t", "t", "e", "time"]), true)
  })
  it("One more test", function() {
    assert.strictEqual(solution(["no", "dog", "on", "good"]), false)
  })
  it("One more test", function() {
    assert.strictEqual(solution(["a", "b", "ab"]), true)
  })
})