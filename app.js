function mult(n1, n2) {
    return n1 * n2;
}
function showResult(num) {
    console.log('Result is: ' + num);
}
function multiplicationHandler(n1, n2, cb) {
    var result = n1 * n2;
    cb(result);
}
//let substractValues: Function;
var product;
product = mult;
multiplicationHandler(22, 4, showResult);
