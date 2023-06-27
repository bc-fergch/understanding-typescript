// If we add a decorator to a property then
// the decorator receives 2 arguments:
const Logger = (target: any, propertyName: string) => {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

class Product {
    @Logger
    title: string;
    private _price: number;

    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Price should be positive');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}