// type AddFn = (a: number, b: number) => number;
interface AddFn {  //Interface as a function type
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1+n2;
}
interface Named {
    readonly name?: string;
    outputName?: string;    //Optional property / parameter
}
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 30;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        const fullPhrase = this.name ? phrase+ ' ' + name : phrase;
        console.log(fullPhrase);
    }
}

let person1: Greetable;

person1 = new Person('Fer')

person1.greet('Hello, its me...');