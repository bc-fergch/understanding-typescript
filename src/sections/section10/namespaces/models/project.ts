namespace App {
    /** PROJECT STUFF */
    export enum ProjectStatus {
        ACTIVE = 'active',
        FINISHED = 'finished'
    }

    /** PROJECT */
    export class Project {
        constructor (
            public id: string,
            public title: string,
            public description: string,
            public people: number,
            public status: ProjectStatus
        ) {}
    }
}