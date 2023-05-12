abstract class Department {
    static fiscalYear = 2023;

    constructor(
        protected readonly id: string,
        public name: string,
        protected employees: string[] = []
    ) {}

    static createEmployee(name: string) {
        return {name: name};
    }

    abstract describe(): void;

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
    private lastReport: string|undefined;

    constructor(id: string, private departments: string[], reports: string[]) {
        super(id, 'HR');
        this.lastReport = reports.pop();
    }

    describe(): void {
        console.log(this.name+'Dept');
    }

    get recentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }

        throw new Error('No report found');
    }

    set mostRecentReport(report: string){
        if(!report) {
            throw new Error('Please introduce a valid value');
        }

        this.lastReport = report
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

const employee1 = Department.createEmployee('Lucy');
console.log(employee1, 'Fiscal year: '+Department.fiscalYear);

const hr = new HRDeparment('d1', ['IT, QA'], []);

hr.describe();
hr.addEmployee('Fer');
hr.printEmployees();
hr.printDepartments();

//hr.mostRecentReport = '';
hr.mostRecentReport = 'Ultimo reporteee';
console.log(hr.recentReport);