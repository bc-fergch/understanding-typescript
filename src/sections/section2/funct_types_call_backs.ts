function mult(n1: number, n2: number): number {
    return n1*n2;
}

function showResult(num: number): void {
    console.log('Result is: '+num);
}

function multiplicationHandler(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1*n2;
    cb(result);
}

//let substractValues: Function;
let product: (a: number, b: number) => number;
product = mult;

multiplicationHandler(22,4, showResult);