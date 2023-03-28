class Department {
    name: string;
    employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    describe() {
        console.log('Departament: '+this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployees() {
        this.employees.forEach(employee => {
            console.log(employee);
        });
    }
}

const tech = new Department('Tech');
tech.describe();
tech.addEmployee('Fer');
tech.addEmployee('Ana');
tech.printEmployees();