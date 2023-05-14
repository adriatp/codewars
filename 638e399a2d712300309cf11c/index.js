function renderChampions(submissions, minimumSubmissionCount) {
  if (minimumSubmissionCount > submissions.length) return "";
  let first_submission = submissions.slice(0,minimumSubmissionCount);
  let actual_winner = first_submission.sort((a,b) => a[1] - b[1])[0];
  let winners = first_submission.filter(e => e[1] == actual_winner[1]);
  submissions.slice(minimumSubmissionCount).forEach(e => {
    if (e[1] <= actual_winner[1]) {
      actual_winner = e;
      winners.push(actual_winner);
    }
  });
  let winners_sorted = winners.sort((a,b) => {
    return a[1] - b[1];
  });
  let winners_grouped = winners_sorted.reduce((res,x) => {
    res[x[0]] = res[x[0]] || {};
    res[x[0]][x[1]] = res[x[0]][x[1]] + 1 || 1;
    return res;
  }, {});
  return Object.keys(winners_grouped).map(e => {
    return `${e} - ` + Object.keys(winners_grouped[e]).map(ee => {
      if (winners_grouped[e][ee] == 1)  return ee;
      else                              return `${ee} (${winners_grouped[e][ee]})`
    }).join(', ');
  }).join('; ');
}

const {assert, config} = require("chai");
config.truncateThreshold = 0;

describe("Solution tests", function() {
  
  function act(submissions, minimumSubmissionCount, expected) {
    const copyOfSubmissions = submissions.map(s => s.slice());
    const actual = renderChampions(copyOfSubmissions, minimumSubmissionCount);
    const msg = `renderChampions( [${submissions.map(([a,b]) => `['${a}', ${b}]`).join(', ')}], ${minimumSubmissionCount} )`;
    assert.isNotNull(actual);
    assert.isString(actual);
    assert.equal(actual, expected, msg);
  }
  
  describe('Example tests', () => {
    it('Insufficient submissions', () => {
      act([["Tim",45], ["Jeff",42]], 3, "");
      act([], 1, "");
    });
    it('Sole submitter', () => {
      act([["Joanne",23], ["Joanne",22]], 2, "Joanne - 22");
      act([["Joanne",23], ["Joanne",22]], 1, "Joanne - 22, 23");
      act([["Huub",22], ["Huub",23]], 2, "Huub - 22");
      act([["Rani",22], ["Rani",22], ["Rani",21], ["Rani",22]], 2, "Rani - 21, 22 (2)");
    });
    it('John & Jane', () => {
      act([["Jane",118], ["John",117], ["John",117], ["Jane",115], ["John",117], ["John",114]], 2, "John - 114, 117 (2); Jane - 115");
      act([["Jane",35], ["John",35], ["Jane",33]], 1, "Jane - 33, 35; John - 35");
      act([["John",35], ["Jane",34]], 2, "Jane - 34");
      act([["John",35], ["Jane",34]], 1, "Jane - 34; John - 35");
      act([["John",33], ["Jane",34], ["John",32], ["Jane",33]], 3, "John - 32");
    });
  });
});
