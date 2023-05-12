class Department {
    constructor(
        private readonly id: string,
        private name: string,
        protected employees: string[] = []
    ) {}

    describe() {
        //this.id = 'a';
        console.log('Departament: ('+this.id+'): '+this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployees() {
        console.log('Employees:');
        this.employees.map(employee => console.log(employee) );
        console.log('\n');
    }
}

class HRDeparment extends Department {
    private departments: string [];

    constructor(id: string, departments: string[]) {
        super(id, 'HR');
        this.departments = departments;
    }

    addEmployee(name: string) {
        this.employees.push(name);
        console.log('Employee name added\n\n');
    }

    printDepartments() {
        console.log('Departments:');
        this.departments.map(department => console.log(department) );
        console.log('\n');
    }
}

const hr = new HRDeparment('d1', ['IT, QA']);
hr.describe();
hr.addEmployee('Fer');
hr.printEmployees();
hr.printDepartments();