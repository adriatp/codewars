const Test = require('@codewars/test-compat');

//  https://www.codewars.com/kata/5622c008f0d21eb5ca000032
//  https://es.wikipedia.org/wiki/Terna_pitag%C3%B3rica#Generaci%C3%B3n_y_caracter%C3%ADsticas

function mcd(a,b) {
  if (b == 0) return a;
  return mcd(b,a%b);
}

function primaryTriple(max_c) {
  let m = 2;
  let primary_triples = [];
  let max_perimeter = -1;
  let largest_triple = [];
  while(true) {
    if (m**2+1 > max_c) break;
    let n=1;
    while (n<m) {
      let a = m**2-n**2;
      let b = 2*m*n;
      let c = m**2+n**2;
      if (c > max_c) break;
      if (mcd(a,b) == 1 && mcd(a,c) == 1 && mcd(b,c) == 1) {
        primary_triples.push([a,b,c]);
        if (max_perimeter == -1 || a+b+c > max_perimeter) {
          max_perimeter = a+b+c;
          largest_triple = [a,b,c];
        }
      }
      n+=1;
    }
    m+=1;
  }
  return [primary_triples, max_perimeter, largest_triple];
}

function findMaxTriple(n) {
  let triples = primaryTriple(n);
  let last_triple =  triples[triples.length-1];
  let a = [
    [`number triples below-eq ${n}`,triples[0].length],
    [`max perimeter`, last_triple[0] + last_triple[1] + last_triple[2]],
    [`largest triple`,[last_triple]]
  ]
  return a;
}

Test.assertDeepEquals(findMaxTriple(50),[['number triples below-eq 50',7],['max perimeter', 90], ['largest triple', [[9, 40, 41]]]]);
Test.assertDeepEquals(findMaxTriple(100),[['number triples below-eq 100', 16], ['max perimeter', 234], ['largest triple', [[65, 72, 97]]]]);
Test.assertDeepEquals(findMaxTriple(150), [['number triples below-eq 150', 24], ['max perimeter', 340], ['largest triple', [[51, 140, 149]]]]);
Test.assertDeepEquals(findMaxTriple(200),[['number triples below-eq 200', 32], ['max perimeter', 456], ['largest triple', [[95, 168, 193]]]]);
