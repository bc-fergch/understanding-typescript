"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["FINISHED"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
const Binded = (_, _2, descriptor) => {
    const originalM = descriptor.value;
    const bindedM = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalM.bind(this);
            return boundFn;
        }
    };
    return bindedM;
};
const validate = (validatableInput) => {
    let isValid = true;
    const stringVal = validatableInput.value.toString().trim();
    if (validatableInput.required) {
        isValid = isValid && stringVal.length > 0;
    }
    if (typeof validatableInput.value === 'string') {
        if (validatableInput.minLength !== null) {
            isValid = isValid && stringVal.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength !== null) {
            isValid = isValid && stringVal.length <= validatableInput.maxLength;
        }
    }
    if (typeof validatableInput.value === 'number') {
        console.log(validatableInput.value >= validatableInput.min);
        if (validatableInput.min !== null) {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max !== null) {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
    }
    return isValid;
};
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class Component {
    constructor(insertAtBeggining, templateId, hostId, elementId) {
        this.insertAtBeggining = insertAtBeggining;
        this.attach = () => {
            const position = this.insertAtBeggining ? 'afterbegin' : 'beforeend';
            this.hostEl.insertAdjacentElement(position, this.element);
        };
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId) {
            this.element.id = elementId;
        }
        this.attach();
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectInput extends Component {
    constructor() {
        super(true, 'project-input', 'app', 'user-input');
        this.configure = () => {
            this.element.addEventListener('submit', this.submitHandler);
        };
        this.renderContent = () => { };
        this.gatherInput = () => {
            const title = this.titleEl.value;
            const description = this.descriptionEl.value;
            const people = +this.peopleEl.value;
            const titleValidatable = {
                value: title,
                required: true,
                minLength: 1,
                maxLength: 20
            };
            const descValidatable = {
                value: description,
                required: true,
                minLength: 10,
                maxLength: 50
            };
            const peopleValidatable = {
                value: people,
                required: true,
                min: 1,
                max: 10
            };
            if (!validate(titleValidatable) ||
                !validate(descValidatable) ||
                !validate(peopleValidatable)) {
                alert('Invalid inputs');
                return;
            }
            return [title, description, people];
        };
        this.clearContent = () => {
            this.titleEl.value = '';
            this.descriptionEl.value = '';
            this.peopleEl.value = '';
        };
        this.titleEl = this.element.querySelector('#title');
        this.descriptionEl = this.element.querySelector('#description');
        this.peopleEl = this.element.querySelector('#people');
        this.configure();
    }
    submitHandler(event) {
        event.preventDefault();
        const inputValues = this.gatherInput();
        if (Array.isArray(inputValues)) {
            const [title, description, people] = inputValues;
            projectState.addProject(title, description, people);
            this.clearContent();
            console.log('Valid form');
        }
    }
}
__decorate([
    Binded
], ProjectInput.prototype, "submitHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super(false, 'project-list', 'app', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        projectState.addListener((projects) => {
            this.assignedProjects = projects.filter(project => project.status === this.type);
            ;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.querySelector('ul').classList.add('droppable');
        }
    }
    dropHandler(event) {
        console.log('drop', event.dataTransfer.getData('text/plain'));
        const id = event.dataTransfer.getData('text/plain');
        projectState.moveProject(id, this.type);
    }
    dragLeaveHandler(_) {
        console.log('droppped - dragLeave');
        this.element.querySelector('ul').classList.remove('droppable');
    }
    renderProjects() {
        const listId = `${this.type}-project-list`;
        const listEl = document.getElementById(listId);
        listEl.replaceChildren('');
        for (const project of this.assignedProjects) {
            new ProjectItem(project, listId);
        }
    }
}
__decorate([
    Binded
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Binded
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Binded
], ProjectList.prototype, "dragLeaveHandler", null);
class ProjectItem extends Component {
    get persons() {
        if (this.project.people === 1) {
            return this.project.people.toString() + ' person assigned';
        }
        return this.project.people.toString() + ' persons assigned';
    }
    constructor(project, listId) {
        super(false, 'single-project', listId, project.id);
        this.project = project;
        this.title = document.createElement('h2');
        this.description = document.createElement('p');
        this.people = document.createElement('span');
        this.configure();
        this.renderContent();
    }
    configure() {
        this.title.textContent = this.project.title;
        this.description.textContent = this.project.description;
        this.people.textContent = this.persons;
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.appendChild(this.title);
        this.element.appendChild(this.people);
        this.element.appendChild(this.description);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
        console.log(event);
    }
    dragEndHandler(_) {
        console.log('Dropped');
    }
}
__decorate([
    Binded
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    Binded
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(p => p.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
        console.log(projectId, newStatus);
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
_a = ProjectState;
ProjectState.getInstance = () => {
    if (!_a.instance) {
        _a.instance = new ProjectState();
    }
    return _a.instance;
};
const projectState = ProjectState.getInstance();
const project = new ProjectInput();
const activeProjects = new ProjectList(ProjectStatus.ACTIVE);
const finishedProjects = new ProjectList(ProjectStatus.FINISHED);
//# sourceMappingURL=app.js.map