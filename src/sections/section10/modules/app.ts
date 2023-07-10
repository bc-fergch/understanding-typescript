import ProjectList from './components/project-list.js';
import ProjectInput from './components/project-input.js';
import { ProjectStatus } from './models/project.js';

/** INTANCES */
new ProjectInput();
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);