//Selecting an html elemnt from the doom
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hiiii :p';
}

interface ErrorContainer {
    //We can have as many properties as we want just have to be of type string,
    //It works great when we don't have how many properties would be needed 
    //or goint to be a different number of properties for each instance.
    [prop: string]: string; 
    //Other type properties CAN NOT be added
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
} 