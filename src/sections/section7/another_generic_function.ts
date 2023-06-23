// Expects two arguments that can be of diferent types. 
const merge = <T extends object, U extends object>(objA: T, objB: U) => {
    return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Fer', hobbies:['Drawing'] }, { age: 25 });
console.log(mergedObj);

interface Lengthy {
    length: number;
}

const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
    let descriptionText = 'Got no value';
    if(element.length > 0) {
        descriptionText = 'Got' + element.length + ' elements';
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Parangaricutirimicuaro'));
console.log(countAndDescribe(['hola', 'adios']));