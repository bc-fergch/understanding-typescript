const WithTemplate = (logString:string, template: string, hookId: string) => {
    console.log('Template factory...');

    return <T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) => {
        console.log(logString);
        
        // We can return things depending of the thing that gets the decorator.
        // In this case it is a class so... we can return a new constructor function
        // That will replace the previous constructor and run once our class is 
        // instanciated :p
        return class extends originalConstructor {
            constructor (..._: any) {
                super();
                const hookEl = document.getElementById(hookId);
        
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@WithTemplate('Decorators runs from down to up', '<h1>My person obj</h1>', 'app')
class Person {
    name = 'Fer';

    constructor() {
        console.log('Creating person object... ');
    }
}

// const person1 = new Person()