/// <reference path="state/project-state.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {

    /** INTANCES */
    new ProjectInput();
    new ProjectList(ProjectStatus.ACTIVE);
    new ProjectList(ProjectStatus.FINISHED);

}