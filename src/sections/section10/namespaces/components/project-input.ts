/// <reference path="../state/project-state.ts" />
/// <reference path="../utils/validation.ts" />
/// <reference path="base-component.ts" />

namespace App {
    /** PROJECT INPUT CLASS*/
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}