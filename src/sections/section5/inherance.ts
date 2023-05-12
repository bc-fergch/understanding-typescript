class Department {
    constructor(
        private readonly id: string,
        private name: string,
        private employees: string[] = []
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

class DevDeparment extends Department {
    private admins: string [];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    showAdmins() {
        console.log('Admins:');
        this.admins.map(admin => console.log(admin));
        console.log('\n');
    }
}

class QADeparment extends Department {
    private tests: string [];

    constructor(id: string, tests: string[]) {
        super(id, 'QA');
        this.tests = tests;
    }

    addTest(test: string) {
        this.tests.push(test);
    }

    printTests() {
        console.log('Tested tickets:')
        this.tests.map(test => console.log('Ticket: '+test));
        console.log('\n');
    }
}

const dev = new DevDeparment('d3', ['Juan']);
dev.describe();
dev.addEmployee('Fer');
dev.addEmployee('Abraham');
dev.addEmployee('Polo');
dev.addEmployee('Juan');
dev.printEmployees();
dev.showAdmins();

const qa = new QADeparment('d4', ['5320']);
qa.describe();
qa.addEmployee('Jessi');
qa.addEmployee('Sergio');
qa.printEmployees();
qa.addTest('2342');
qa.addTest('3902');
qa.printTests();