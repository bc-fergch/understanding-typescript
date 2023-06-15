const fetchedUserData = {
    id: 'aidi',
    name: 'Fer',
    hobbie: { title: 'Drawing', ageStarted: 6 }
}

// ? checks if the object or property exists before continue.
// Da way it doesn't raise an exception. 
console.log(fetchedUserData?.hobbie?.title);