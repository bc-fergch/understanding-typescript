interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}

let person1: Person;

person1 = {
    name: 'Fer',
    age: 25,
    greet(phrase: string){
        console.log(phrase+' '+this.name);
    }
};

person1.greet('Hello, its me...');