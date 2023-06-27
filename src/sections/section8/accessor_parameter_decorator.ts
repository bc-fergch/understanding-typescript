// If we add a decorator to a property then
// the decorator receives 2 arguments:
const Logger = (target: any, propertyName: string) => {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

// If we add a decorator to accessors (getter or setter) 
// it also receives a (accessor) descriptor.
const Logger2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// If we add decorator to methods then we receive
// the same as with accessors, but with a method descriptor.
const Logger3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// If we add a decorator to a parameter method
// we have a target, name (the name of the method related
// to the parameter, not the parameter name), and a
// position of the argument (for ex: first argument = 0)
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