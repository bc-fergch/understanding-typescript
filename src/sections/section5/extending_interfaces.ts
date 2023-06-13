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