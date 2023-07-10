/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="base-component.ts" />

namespace App {
    /** PROJECT LIST CLASS */
    export class ProjectList
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

    export class ProjectItem
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
}