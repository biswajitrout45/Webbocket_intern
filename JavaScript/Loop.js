// For Loop

for (let i = 0; i < 5; i++) {
    console.log(i);
}

// while Loop

let j =0;

while (j < 5) {
    console.log(j);
    j++;
}

// do while Loop

let k = 0;
do {
    console.log(k);
    k++;
} while (k < 5);

// for...in Loop

const person = {fname:"John", lname:"Doe", age:25};

for (let x in person) {
    console.log(x + ": "+ person[x]);
}

// for...of Loop
const cars = ["BMW", "Volvo", "Mini"];

for (let car of cars) {
    console.log(car);
}