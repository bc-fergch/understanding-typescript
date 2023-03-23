"use strict";
function combineParse(input1, input2, resultConversion) {
    return (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') ?
        +input1 + +input2
        : input1.toString() + input2.toString();
}
const combPAges = combineParse(22, 23);
const combPNames = combineParse('Raul', 'Ana');
const combAgesFromString = combineParse('12', '45', 'as-number');
console.log(combPAges);
console.log(combPNames);
console.log(combAgesFromString);
