function combine(input1: number|string, input2: number|string): number|string {
    return (typeof input1 === 'number' && typeof input2 === 'number') ? 
        input1+input2 
        : input1.toString()+input2.toString();
}

const combAges = combine(22,23);
const combNames = combine('Raul', 'Ana');

console.log(combAges);
console.log(combNames);