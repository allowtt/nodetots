class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName+ middleInitial+lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`;
}
function greeter1(person: string) {
    return `Hello, ${person}`;
}

let user = new Student("l", "test", "gy");
let user1 = "123";
let user2 = {firstName: "l", lastName: 'gy'};

console.log(greeter(user));

console.log(greeter1(user1));
