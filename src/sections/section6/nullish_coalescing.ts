const userInput = '';

// Nullish coalescing operator: ??
// Estrictly check if the variable is nil or undefined
// If so assign the 'DEFAULT' value, 
// otherwise return the variable value
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);