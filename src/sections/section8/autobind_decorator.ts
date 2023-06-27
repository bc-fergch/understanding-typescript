const Autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // -this- will refer to whatever its responsible
            // to trigger this -get- method.
            // So -this- will refer to the original object where 
            // we define this method.
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

// The exclamation mark indicates Typescript that
// the element exists and it will not be null.
const button = document.querySelector('button')!;

// In this case the "showMessage" method will return
// undefined since the -this- property on it won't
// refer the class but the -addEventListener- context.

// button.addEventListener('click', p.showMessage);


// That's why we need to add the bind method to
// indicate Typescript that we want to take the context
// of p.

// button.addEventListener('click', p.showMessage.bind(p));

// Lets try with the decorator, now this works <:
button.addEventListener('click', p.showMessage);
