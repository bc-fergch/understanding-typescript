interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string] : string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, propName: string) => {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

const PositiveNumber = (target: any, propName: string) => {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }
}

// obj isn't of type object to have
// more flexibility since we are trying to
// get the boolean value of obj[prop]
const validate = (obj: any) => {
    const objValidatorConfig = registeredValidators[obj.constructor.name];

    if (!objValidatorConfig) {
        return true;
    }

    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid &&= !!obj[prop];
                    break;
                case 'positive':
                    isValid &&= obj[prop] > 0;
                    break;
            }
        }
    }

    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    // We add a '+' elemet to convert it to a number
    const price = +priceEl.value;

    const createdCoourse = new Course(title, price);

    if (!validate(createdCoourse)) {
        alert('Invalid input, please try again!');
        return;
    }

    console.log(createdCoourse);
});