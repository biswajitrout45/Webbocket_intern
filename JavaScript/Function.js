// Normal Function

function add(){
    console.log(5+9);
}
add()

// Arrow Function
const multiply=()=>{
    console.log(5*4)
}
multiply()

//Anonymous fnction

const substraction = function(){
    console.log(10-2)
}
substraction()

//Callback Function

function division(hello){
    hello()
}

division(function (){
    console.log(10/3)
})
division( ()=> {
    console.log(15/6)
})