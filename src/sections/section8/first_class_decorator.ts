// Decorators is in the end just a function applied to something
// (for example: a Class) in a certain way.

// Decorators takes "n" number of arguments.
// the value of "n" depends of on what we apply the decorators.
const Logger = (constructor: Function) => {
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class Person {
    name = 'Fer';

    constructor() {
        console.log('Creating person object...');
    }
}

// The decorator execution depends of the definition of the class 
// it doesn't need the class to be instanciated.
const pers = new Person();

console.log(pers);