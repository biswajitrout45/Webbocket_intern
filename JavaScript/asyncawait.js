// const getProducts = async () => {
//     const res = await fetch('https://dummyjson.com/products');
//     console.log(res);
//     const data = await res.json();
//     console.log(data.products)
// }
// getProducts()


//Hoisting

//variable Hoisting
// console.log(x)
// let x = 10
// console.log(x)

// console.log(y)

// var y = 20

// console.log(y)

// conole.log(z)
// const z = 20
// console.log(z)
//Function Hoisting
// add(7,8)

// function add(a,b){
//     console.log(a+b)
// }
// add(5,6)


// sub(20,5)
// const sub = (a,b) => {
//     console.log(a-b)
// }
// sub(10,5)


//Destructuring

const marks = [20,40,12,15]

const [a,b,c,d] = marks
console.log(a,b,c,d)

const person = {fname:"John",
     lname:"Doe",
      age:25}

const {fname,lname,age} = person
console.log(fname,lname,age)