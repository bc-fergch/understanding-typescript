interface Draggable {
    dragStartHandler(event: DragEvent): void,
    dragEndHandler(event: DragEvent): void
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void, // Permits the drag
    dropHandler(event: DragEvent): void, // Handle the drop
    dragLeaveHandler(event: DragEvent): void // Return feedback once it's dropped
}

/** PROJECT STUFF */
enum ProjectStatus {
    ACTIVE = 'active',
    FINISHED = 'finished'
}

type Listener<T> = (items: T[]) => void;

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

const Binded = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const originalM = descriptor.value;
    const bindedM: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(): string {
            const boundFn = originalM.bind(this);
            return boundFn; 
        }
    };

    return bindedM;
}

const validate = (validatableInput: Validatable): boolean => {
    let isValid = true;
    const stringVal = validatableInput.value.toString().trim();

    if (validatableInput.required) {
        isValid = isValid && stringVal.length > 0;
    }

    if (typeof validatableInput.value === 'string') {
        if (validatableInput.minLength !== null) {
            isValid = isValid && stringVal.length >= validatableInput.minLength!;
        }

        if (validatableInput.maxLength !== null) {
            isValid = isValid && stringVal.length <= validatableInput.maxLength!;
        }
    }

    if (typeof validatableInput.value === 'number') {
        console.log(validatableInput.value >= validatableInput.min!)
        if (validatableInput.min !== null) {
            isValid = isValid && validatableInput.value >= validatableInput.min!;
        }

        if (validatableInput.max !== null) {
            isValid = isValid && validatableInput.value <= validatableInput.max!;
        }
    }

    return isValid;
}

/** PROJECT */
class Project {
    constructor (
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

/** COMPONENT BASE CLASS */

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor (
        private insertAtBeggining: boolean,
        templateId: string,
        hostId: string,
        elementId?: string,
    ) {
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostEl = document.getElementById(hostId)! as T;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;
        if (elementId) {
            this.element.id = elementId;
        }
        
        this.attach();
    }

    private attach = (): void => {
        const position = this.insertAtBeggining ? 'afterbegin' : 'beforeend';
        this.hostEl.insertAdjacentElement(position, this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
    
}

/** STATE BASE CLASS */

abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

/** PROJECT INPUT CLASS*/

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleEl: HTMLInputElement;
    descriptionEl: HTMLInputElement;
    peopleEl: HTMLInputElement;

    constructor () {
        super(true, 'project-input', 'app', 'user-input');
        
        this.titleEl = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionEl = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleEl = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    configure = (): void => {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent = ():void => {}

    private gatherInput = (): [string, string, number] | void => {
        const title = this.titleEl.value;
        const description = this.descriptionEl.value;
        const people = +this.peopleEl.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true,
            minLength: 1,
            maxLength: 20
        };

        const descValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 10,
            maxLength: 50
        };

        const peopleValidatable: Validatable = {
            value: people,
            required: true,
            min: 1,
            max: 10
        };
        
        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid inputs');
            return;
        }

        return [title, description, people];
    }

    @Binded
    private submitHandler(event: Event) {
        event.preventDefault();

        const inputValues = this.gatherInput();

        if (Array.isArray(inputValues)) {
            const [title, description, people] = inputValues;
            projectState.addProject(title, description, people);
            this.clearContent();
            console.log('Valid form');
        }
    }

    private clearContent = (): void => {
        this.titleEl.value = '';
        this.descriptionEl.value = '';
        this.peopleEl.value = '';
    }
}

/** PROJECT LIST CLASS */

class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[];

    // Typescript makes the declaration and assignments of type:
    // "this.propery" for us, so we only have to declare constructor
    // params like this to have the same result as assignation ourselfs.
    constructor(private type: ProjectStatus) {
        super(false, 'project-list', 'app', `${type}-projects`);
        this.assignedProjects = [];
        
        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);

        projectState.addListener( (projects: Project[]) => {
            this.assignedProjects = projects.filter(project => project.status === this.type);;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    @Binded
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.querySelector('ul')!.classList.add('droppable');
        }
    }

    @Binded
    dropHandler(event: DragEvent): void {
        console.log('drop', event.dataTransfer!.getData('text/plain'));
        const id = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(id, this.type);
    }

    @Binded
    dragLeaveHandler(_: DragEvent): void {
        console.log('droppped - dragLeave');
        this.element.querySelector('ul')!.classList.remove('droppable');
    }

    private renderProjects() {
        const listId = `${this.type}-project-list`;
        const listEl = document.getElementById(listId)! as HTMLUListElement;
        listEl.replaceChildren('');

        for (const project of this.assignedProjects) {
            new ProjectItem(project, listId);
        }

    }
}

/** PROJECT ITEM LIST */

class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
{
    title: HTMLHeadingElement;
    description: HTMLParagraphElement;
    people: HTMLSpanElement;

    get persons(): string {
        if (this.project.people === 1) {
            return this.project.people.toString() + ' person assigned';
        }

        return this.project.people.toString() + ' persons assigned';
    }

    constructor (public project: Project, listId: string) {
        super(false, 'single-project', listId, project.id);

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

    renderContent(): void {
        this.element.appendChild(this.title);
        this.element.appendChild(this.people);
        this.element.appendChild(this.description);
    }

    @Binded
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
        console.log(event)
    }

    @Binded
    dragEndHandler(_: DragEvent): void {
        console.log('Dropped')
    }
}

/** PROJECT STATE CLASS */

class ProjectState extends State<Project>{
    private static instance: ProjectState;
    private projects: Project[];

    private constructor() {
        super();
        this.projects = [];
    }

    static getInstance = (): ProjectState => {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.ACTIVE
        );
        this.projects.push(newProject);

        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(p => p.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }

        console.log(projectId, newStatus);
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // -slice- to send a copy
        }
    }
}

/** INTANCES */
const projectState = ProjectState.getInstance();
const project = new ProjectInput();

const activeProjects = new ProjectList(ProjectStatus.ACTIVE);
const finishedProjects = new ProjectList(ProjectStatus.FINISHED);