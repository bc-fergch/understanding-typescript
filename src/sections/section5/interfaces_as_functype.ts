// type AddFn = (a: number, b: number) => number;
interface AddFn {  //Interface as a function type
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1+n2;
}
interface Named {
    readonly name: string;
}
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(phrase+ ' ' + name);
    }
}

let person1: Greetable;

person1 = new Person('Fer')

person1.greet('Hello, its me...');