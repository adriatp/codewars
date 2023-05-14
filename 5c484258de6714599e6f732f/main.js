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