"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role[Role["READ_ONLY"] = 3] = "READ_ONLY";
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: 'Fernanda',
    age: 25,
    hoobies: ['Painting', 'Crafting'],
    role: Role.ADMIN
};
console.log(person.name);
for (const hobby of person.hoobies) {
    console.log(hobby.toUpperCase());
}
