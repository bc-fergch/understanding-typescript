type Combinable = number|string;
type ConversionDescriptor = 'as-number'|'as-text';
function combineParse(
    input1: Combinable, 
    input2: Combinable, 
    resultConversion?: ConversionDescriptor
): number|string {
    return (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') ? 
        +input1 + +input2 
        : input1.toString()+input2.toString();
}

const combPAges = combineParse(22,23);
const combPNames = combineParse('Raul', 'Ana');
const combAgesFromString = combineParse('12','45', 'as-number');

console.log(combPAges);
console.log(combPNames);
console.log(combAgesFromString);