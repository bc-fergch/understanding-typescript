function add(n1: number, n2: number, showResult: boolean, phrase: string = ''): number|void {
    const result = n1+n2;

    if(showResult) {
        console.log(phrase + result);
    } else {
        return result;
    }
}

var num1 = 5;
var num2 = 2.8;

add(num1, num2, true, 'Result is: ');