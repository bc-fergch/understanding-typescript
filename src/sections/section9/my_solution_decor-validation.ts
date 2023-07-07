interface InputValue {
    [propName: string]: {
        message: string,
        isValid: boolean,
        type: string
    },
}

const Binded = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const originalM = descriptor.value;
    const bindedM: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(): string {
            const boundFn = originalM.bind(this);
            return boundFn; 
        }
    };

    return bindedM;
}

const ValidString = (_: any, propName: string) => {
    inputValues = {...inputValues, [propName]: {
        message: "Please enter a valid text",
        isValid: true,
        type: 'string'
    }}
}

const ValidNumber = (_: any, propName: string) => {
    inputValues = {...inputValues, [propName]: {
        message: "Enter a value between 1-10",
        isValid: true,
        type: 'number'
    }}
}

const validate = (obj: any): boolean => {
    const inputValidation = Object.assign({}, inputValues);

    if (!inputValidation) {
        return true;
    }

    let isValid = true;
    for (const prop in inputValidation) {
        const input = inputValidation[prop];

        switch (input.type) {
            case 'string':
                input.isValid = obj[prop].value.trim().length > 0;
                isValid &&= input.isValid;
                break;
            case 'number':
                input.isValid = +obj[prop].value > 0 && +obj[prop].value <= 10;
                isValid &&= input.isValid;
                break;
        }
    }

    return isValid;
}

let inputValues: InputValue = {};

class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    formEl: HTMLFormElement;
    @ValidString
    titleEl: HTMLInputElement;
    @ValidString
    descriptionEl: HTMLInputElement;
    @ValidNumber
    peopleEl: HTMLInputElement;

    constructor() {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.formEl = importedNode.firstElementChild as HTMLFormElement;
        this.formEl.id = 'user-input';
        
        this.titleEl = this.formEl.querySelector('#title')! as HTMLInputElement;
        this.descriptionEl = this.formEl.querySelector('#description')! as HTMLInputElement;
        this.peopleEl = this.formEl.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    @Binded
    private submitHandler(event: Event) {
        event.preventDefault();
        
        if (!validate(this)) {
            alert('Invalid inputs');
            return;
        }

        this.clearForm();
        console.log('Valid form');
    }

    private clearForm = (): void => {
        this.titleEl.value = '';
        this.descriptionEl.value = '';
        this.peopleEl.value = '';
    }

    private configure = (): void => {
        this.formEl.addEventListener('submit', this.submitHandler);

    }

    private attach = (): void => {
        this.hostEl.insertAdjacentElement('afterbegin', this.formEl)
    }
}

const project = new ProjectInput();