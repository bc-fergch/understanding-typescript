class Department {
    private employees: string[] = [];

    constructor(private readonly id: string, private name: string) {}

    describe() {
        //this.id = 'a';
        console.log('Departament: ('+this.id+'): '+this.name);
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

const tech = new Department('d3', 'Tech');
tech.describe();
tech.addEmployee('Fer');
tech.addEmployee('Ana');
tech.printEmployees();