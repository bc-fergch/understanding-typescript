enum Role {
    ADMIN = 5,
    READ_ONLY = 3,
    AUTHOR = 1
};

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: Role;
} = {
    name: 'Fernanda',
    age: 25,
    hoobies: ['Painting', 'Crafting'],
    role: Role.ADMIN
};

console.log(person.name);

for (const hobby of person.hoobies) {
    console.log(hobby.toUpperCase());
}