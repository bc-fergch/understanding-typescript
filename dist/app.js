"use strict";
class Department {
    constructor(id, name, employees = []) {
        this.id = id;
        this.name = name;
        this.employees = employees;
    }
    describe() {
        console.log('Departament: (' + this.id + '): ' + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployees() {
        console.log('Employees:');
        this.employees.map(employee => console.log(employee));
        console.log('\n');
    }
}
class HRDeparment extends Department {
    constructor(id, departments, reports) {
        super(id, 'HR');
        this.departments = departments;
        this.lastReport = reports.pop();
    }
    get recentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }
    set mostRecentReport(report) {
        if (!report) {
            throw new Error('Please introduce a valid value');
        }
        this.lastReport = report;
    }
    addEmployee(name) {
        this.employees.push(name);
        console.log('Employee name added\n\n');
    }
    printDepartments() {
        console.log('Departments:');
        this.departments.map(department => console.log(department));
        console.log('\n');
    }
}
const hr = new HRDeparment('d1', ['IT, QA'], []);
hr.describe();
hr.addEmployee('Fer');
hr.printEmployees();
hr.printDepartments();
hr.mostRecentReport = 'Ultimo reporteee';
console.log(hr.recentReport);
//# sourceMappingURL=app.js.map