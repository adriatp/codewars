const chai = require('chai')
const assert = chai.assert;
chai.config.truncateThreshold = 0

function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  return Array.from(a).every(element => {
    return b.has(element);
  });
}

function mergePeriods(periods) {
  let min_from = null, max_to = null;
  let difference, days, start, array;

  periods.forEach((element, i) => {
    if (min_from == null || element['from'] < min_from )
      min_from = element['from'];
    if (max_to == null || element['to'] > max_to)
      max_to = element['to'];
  });

  
  periods = periods.map((element, i) => {
    console.log(element);
    difference = new Date(element['to']).getTime() - new Date(element['from']).getTime();
    days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    difference = new Date(element['from']).getTime() - new Date(min_from).getTime();
    start = Math.ceil(difference / (1000 * 3600 * 24));
    element['start'] = start;
    element['days'] = days;
    return element;
  });
  
  
  difference = new Date(max_to).getTime() - new Date(min_from).getTime();
  days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  array = new Array(days);
  console.log('d: ' + days);  
  for (let i=0; i<array.length; i++) { 
    let d = new Date(min_from);
    d.setDate(d.getDate() + i);
    array[i] = {};
    array[i]['titles'] = new Set();
    array[i]['date'] = d.toISOString().substring(0,10);
  }

  periods.forEach(element => {
    for (let i=element['start']; i<element['start'] + element['days']; i++)
      array[i]['titles'].add(element['title']);
  });

  let ret_array = new Array();
  let i = 0;
  while (i < array.length) {
    let act = {
      'from' : array[i]['date'],
      'to': '',
      'title': array[i]['titles'] 
    }
    while(i < array.length && setsAreEqual(act['title'], array[i]['titles']))
      i++;
    act['to'] = array[i-1]['date'];
    ret_array.push(act);
  }

  ret_array = ret_array.map(element => {
    let set_array = Array.from(element['title']);
    set_array.sort();
    element['title'] = set_array.join(', ');
    return element;
  });

  return ret_array;
}

describe("simple", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-05', to: '2019-01-31', title: 'A' },
      { from: '2019-01-15', to: '2019-02-05', title: 'B' }
    ];
    
    const expected = [
        { from: '2019-01-05', to: '2019-01-14', title: 'A' },
        { from: '2019-01-15', to: '2019-01-31', title: 'A, B' },
        { from: '2019-02-01', to: '2019-02-05', title: 'B' }
      ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});

describe("start together", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-05', to: '2019-01-31', title: 'A' },
      { from: '2019-01-05', to: '2019-01-15', title: 'B' },
      { from: '2019-01-05', to: '2019-02-25', title: 'C' },
    ];
    
    const expected = [
        { from: '2019-01-05', to: '2019-01-15', title: 'A, B, C' },
        { from: '2019-01-16', to: '2019-01-31', title: 'A, C' },
        { from: '2019-02-01', to: '2019-02-25', title: 'C' }
      ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});

describe("end together", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-15', to: '2019-02-25', title: 'A' },
      { from: '2019-01-14', to: '2019-02-25', title: 'B' },
      { from: '2019-01-01', to: '2019-02-25', title: 'C' },
    ];
    
    const expected = [
        { from: '2019-01-01', to: '2019-01-13', title: 'C' },
        { from: '2019-01-14', to: '2019-01-14', title: 'B, C' },
        { from: '2019-01-15', to: '2019-02-25', title: 'A, B, C' }
      ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});

describe("in between", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-01', to: '2019-02-25', title: 'A' },
      { from: '2019-01-15', to: '2019-02-15', title: 'B' }
    ];
    
    const expected = [
        { from: '2019-01-01', to: '2019-01-14', title: 'A' },
        { from: '2019-01-15', to: '2019-02-15', title: 'A, B' },
        { from: '2019-02-16', to: '2019-02-25', title: 'A' }
      ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});

describe("connected", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-01', to: '2019-01-01', title: 'A' },
      { from: '2019-01-02', to: '2019-01-02', title: 'B' },
      { from: '2019-01-03', to: '2019-01-03', title: 'C' }
    ];
    
    const expected = [
      { from: '2019-01-01', to: '2019-01-01', title: 'A' },
      { from: '2019-01-02', to: '2019-01-02', title: 'B' },
      { from: '2019-01-03', to: '2019-01-03', title: 'C' }
    ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});

describe("1 day overlapping", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-01', to: '2019-01-02', title: 'A' },
      { from: '2019-01-02', to: '2019-01-03', title: 'B' },
      { from: '2019-01-03', to: '2019-01-04', title: 'C' }
    ];
    
    const expected = [
      { from: '2019-01-01', to: '2019-01-01', title: 'A' },
      { from: '2019-01-02', to: '2019-01-02', title: 'A, B' },
      { from: '2019-01-03', to: '2019-01-03', title: 'B, C' },
      { from: '2019-01-04', to: '2019-01-04', title: 'C' },
    ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});

describe("gaps", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-01', to: '2019-01-01', title: 'A' },
      { from: '2019-01-02', to: '2019-01-05', title: 'B' },
      { from: '2019-01-07', to: '2019-01-09', title: 'C' },
      { from: '2019-01-12', to: '2019-01-15', title: 'D' }
    ];
    
    const expected = [
        { from: '2019-01-01', to: '2019-01-01', title: 'A' },
        { from: '2019-01-02', to: '2019-01-05', title: 'B' },
        { from: '2019-01-06', to: '2019-01-06', title: '' },
        { from: '2019-01-07', to: '2019-01-09', title: 'C' },
        { from: '2019-01-10', to: '2019-01-11', title: '' },
        { from: '2019-01-12', to: '2019-01-15', title: 'D' }
      ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});


describe("complex scenario", function(){
  it("periods match", function() {
    const periods = [
      { from: '2019-01-05', to: '2019-01-31', title: 'Learn JS' },
      { from: '2019-01-07', to: '2019-01-15', title: 'Learn Haskell' },
      { from: '2019-02-03', to: '2019-02-05', title: 'Refresh JS' },
      { from: '2019-02-04', to: '2019-02-08', title: 'Create something' },
    ];
    
    const expected = [
        { from: '2019-01-05', to: '2019-01-06', title: 'Learn JS' },
        { from: '2019-01-07', to: '2019-01-15', title: 'Learn Haskell, Learn JS' },
        { from: '2019-01-16', to: '2019-01-31', title: 'Learn JS' },
        { from: '2019-02-01', to: '2019-02-02', title: '' },
        { from: '2019-02-03', to: '2019-02-03', title: 'Refresh JS' },
        { from: '2019-02-04', to: '2019-02-05', title: 'Create something, Refresh JS' },
        { from: '2019-02-06', to: '2019-02-08', title: 'Create something' },
      ];

    assert.deepEqual(mergePeriods(periods), expected);
  });
});
