// Just a function :p - DECORATOR FACTORY
// Now we can pass values to our decorator function <:
const Logger = (logString: string) => {
    // Decorator function (lambda)
    return (constructor: Function) => {
        console.log(logString);
        console.log(constructor);
    }
}

// We are executing a function that will return our decoration function
@Logger('Logging - Person ...')
class Person {
    name = 'Fer';

    constructor() {
        console.log('Creating person object...');
    }
}