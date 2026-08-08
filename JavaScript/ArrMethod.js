let arr=[10,50,40,30,20]

// //push method
// arr.push(60)
// console.log(arr)

// //pop method
// arr.pop()
// console.log(arr)

// //shift method
// arr.shift()
// console.log(arr)

// //unshift method
// arr.unshift(100)
// console.log(arr)

// //slice method
// let arr2=arr.slice(1,3)
// console.log(arr2)

// //splice method
// let arr3=arr.splice(1,3,100)
// console.log(arr3)
// console.log(arr)

// //reverse method
// console.log(arr.reverse())

// //length method
// console.log(arr.length)

// //includes method
// console.log(arr.includes(50))

// //forEach method
// arr.forEach(element=>{
//     console.log(element)
// })

//map method

let arr4=arr.map(element=>{
    return element*2
})
console.log(arr4)


//filter method

let arr5=arr.filter(element=>{
    return element>30
})
console.log(arr5)

//reduce method
let arr6=arr.reduce((sum,element)=> sum+=element,0)
console.log(arr6)

//sort method
let element=[10,40,12,7,50,2,85,43,100]
let Ascending=element.sort((a,b)=>a-b)
console.log(Ascending)
let Descending=element.sort((a,b)=>b-a)
console.log(Descending)
