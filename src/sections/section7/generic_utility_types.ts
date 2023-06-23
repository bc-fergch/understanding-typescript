interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// Partial type tells Typescript that it would be of type
// CourseGoal but all the properties are optional.
// That's why we can assign an empty object (in this case ofc)
const createCourseGoal = (
    title: string,
    description: string,
    date: Date
): CourseGoal => {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    // Explicit conversion due to Partial type assigned isn't equal to CourseGoal.
    return courseGoal as CourseGoal;
}

// Tells Typescript that isn't only an array of string
// Also it is read only.
const names: Readonly<string[]> = ['Fer', 'Maria'];

// We are not allow to change the object or properties of the object.
// names.push('Mich');
// names.pop();

