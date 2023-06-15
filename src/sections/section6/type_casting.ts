//Selecting an html elemnt from the doom
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hiiii :p';
}

// Type Casting helps us to inform TS that a certain value is of a specific type.