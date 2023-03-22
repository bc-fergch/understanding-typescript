function substract(n1: number, n2: number): number {
    return n1-n2;
}

function printResult(num: number): void {
    console.log('Result: '+num);
}

printResult(substract(5,2));

//let substractValues: Function;
let substractValues: (a: number, b: number) => number;

substractValues = substract;
//substractValues = printResult;
//substractValues = 3;

console.log(substractValues(2,2));