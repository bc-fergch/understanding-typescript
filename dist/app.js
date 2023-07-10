import ProjectList from './components/project-list.js';
import ProjectInput from './components/project-input.js';
import { ProjectStatus } from './models/project.js';
new ProjectInput();
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);
//# sourceMappingURL=app.js.map