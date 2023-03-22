function combineParse(input1, input2, resultConversion) {
    return (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') ?
        +input1 + +input2
        : input1.toString() + input2.toString();
}
var combPAges = combineParse(22, 23);
var combPNames = combineParse('Raul', 'Ana');
var combAgesFromString = combineParse('12', '45', 'as-number');
console.log(combPAges);
console.log(combPNames);
console.log(combAgesFromString);
