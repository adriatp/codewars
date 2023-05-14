const Test = require('@codewars/test-compat');

/*
/**
 * 
 * @param {number[][]} recs
 * @returns {number}
function calculate(recs){
    if (recs.length == 0) return 0;
    let max_h = 0;
    let max_v = 0; 
    for (let i=0; i<recs.length; i++) {
        if (recs[i][2] > max_h) max_h = recs[i][2];
        if (recs[i][3] > max_v) max_v = recs[i][3];
    }
    let plane = new Array(max_v);
    for (let i=0; i<max_v; i++)
        plane[i] = new Array(max_h).fill(0);
    
    sum_recs = 0
    for (let k=0; k<recs.length; k++) {
        for (let i=recs[k][1]; i<recs[k][3]; i++) {
            for (let j=recs[k][0]; j<recs[k][2]; j++) {
                if (plane[i][j] == 0) {
                    sum_recs += 1;
                    plane[i][j] = 1;
                }
            }
        }
    }
    return sum_recs;
}   
*/

function intersect_area(r1,r2) {
    let inter_x0 = r1[0] > r2[0] ? r1[0] : r2[0];
    let inter_y0 = r1[1] > r2[1] ? r1[1] : r2[1];
    let inter_x1 = r1[2] < r2[2] ? r1[2] : r2[2];
    let inter_y1 = r1[3] < r2[3] ? r1[3] : r2[3];
    if ((inter_x1 - inter_x0 > 0) && (inter_y1 - inter_y0 > 0))
        return (inter_x1 - inter_x0) * (inter_y1 - inter_y0);
    return 0;
}

function calculate(recs){
    if (recs.length == 0) return 0;
    sum_recs = 0;
    for (let k=0; k<recs.length; k++) 
        sum_recs += (recs[k][2] - recs[k][0]) * (recs[k][3] - recs[k][1]);
    for (let k=0; k<recs.length-1; k++) {
        for (let kk=k+1; kk<recs.length; kk++) {
            sum_recs -= intersect_area(recs[k],recs[kk]);
        }
    }
    return sum_recs;
}   

Test.assertEquals(calculate([]), 0, 'calculate([]) should return 0');

Test.assertEquals(calculate([[0,0,1,1]]), 1, 'calculate([[0,0,1,1]]) should retu  rn 1');

Test.assertEquals(calculate([[0, 4, 11, 6]]), 22, 'calculate([[0, 4, 11, 6]]]) should return 22');

Test.assertEquals(calculate([[0,0,1,1], [1,1,2,2]]), 2, 'calculate([[0,0,1,1], [1,1,2,2]]) should return 2');

Test.assertEquals(calculate([[0,0,1,1], [0,0,2,2]]) , 4, 'calculate([[0,0,1,1], [0,0,2,2]]) should return 4');

Test.assertEquals(calculate([[3,3,8,5], [6,3,8,9], [6,2,12,5]]), 28, 'calculate([[3,3,8,5], [6,3,8,9],[11,6,14,12]]) should return 36');