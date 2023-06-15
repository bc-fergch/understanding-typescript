//Interfaces could be use instead of types but bring more code lines.

type Admin = {
    name: string;
    priviledges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// Intersection types allow us to combine many types.
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Fer',
    priviledges: ['developer'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;