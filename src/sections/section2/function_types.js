"use strict";
function substract(n1, n2) {
    return n1 - n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
printResult(substract(5, 2));
//let substractValues: Function;
let substractValues;
substractValues = substract;
//substractValues = printResult;
//substractValues = 3;
console.log(substractValues(2, 2));
