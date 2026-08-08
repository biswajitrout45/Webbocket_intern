//without parameter

function add(){
    return 5+7;
}
console.log(add());

//with parameter
function multiply(a,b){
    return a*b;
}
console.log(multiply(5,7));
console.log(multiply(8,4));

//default parameter
function division(a,b=3){
    console.log(a,b);
    return a/b;
}
console.log(division(6));
console.log(division(6,2));