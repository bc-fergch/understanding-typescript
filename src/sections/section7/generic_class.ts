class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T): void {
        this.data.push(item);
    }

    removeItem(item: T): void {
        const index = this.data.indexOf(item);
        if (index === -1) {
            return;
        }
        this.data.splice(index, 1);
    }

    getItems(): T[] {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Fer');
textStorage.addItem('Glz');
textStorage.removeItem('Fer');
console.log(textStorage.getItems());

const numbStorage = new DataStorage<number>();
numbStorage.addItem(10);
numbStorage.addItem(30);
console.log(numbStorage.getItems());

// Won't work with objects since we constraint the DataStorage class to deal only
// with strings, numbers or boolean types.

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Fer'});
// objStorage.addItem({name: 'Maria'});
// //...
// objStorage.removeItem({name:'Fer'});
// console.log(objStorage.getItems());