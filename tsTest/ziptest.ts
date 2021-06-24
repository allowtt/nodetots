import validator from "./zipcodeValidator";

let myValidator = new validator();

let strings: Array<string> = ["Hello", "98052", "101"];

// strings.forEach(s => {
//     console.log(`"${s}" ${validator(s) ? "matches" : "does not match"}`);
// });