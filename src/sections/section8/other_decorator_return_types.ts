// All decorator can return something but in the case of
// property and parameter decortators, Typescript will
// ignore it :'(
const Logger = (target: any, propertyName: string) => {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

// For accessors and method decorators, returning values are
// supported (:
const Logger2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// For accessors and method decorators, returning values are
// supported (:
const Logger3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// All decorator can return something but in the case of
// property and parameter decortators, Typescript will
// ignore it :'(
const Logger4 = (target: any, name: string | Symbol, position: number) => {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Logger
    title: string;
    private _price: number;

    @Logger2
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

    @Logger3
    getPriceWithTax(@Logger4 tax: number) {
        return this._price * (1 + tax);
    }
}