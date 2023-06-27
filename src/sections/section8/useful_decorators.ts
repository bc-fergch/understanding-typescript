const Logger = (logString: string) => {
    console.log('Logger Factory...');
    // Decorator function (lambda)
    return (constructor: Function) => {
        console.log(logString);
        console.log(constructor);
    }
}

const WithTemplate = (logString:string, template: string, hookId: string) => {
    console.log('Template factory...');
    // If we are not interested in the constructor 
    // we can put "_" to indicate that I dont need it, we have to specify it tho.
    return (constructor: any) => {
        console.log(logString);
        const hookEl = document.getElementById(hookId);
        const p = new constructor();

        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger('So, as a decorator I run in 2nd place...')    //As a function this one runs first but...
@WithTemplate('Decorators runs from down to up', '<h1>My person obj</h1>', 'app') // The decorator inside of this one runs first
class Person {
    name = 'Fer';

    constructor() {
        console.log('Creating person object...');
    }
}