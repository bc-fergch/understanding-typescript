import ProjectList from './components/project-list';
import ProjectInput from './components/project-input';
import { ProjectStatus } from './models/project';

/** INTANCES */
new ProjectInput();
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);