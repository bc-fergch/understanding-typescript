"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log('Departament: (' + this.id + '): ' + this.name);
    }
    addEmployee(employee) {
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
//# sourceMappingURL=app%20copy.js.map