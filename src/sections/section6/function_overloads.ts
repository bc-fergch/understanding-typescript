type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Function overloads helps us to indicate which return type is expected
// taking in count the type of the parameters.
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a+b;
}

const result = add('Fer', 'Glz');
result.split(' ');