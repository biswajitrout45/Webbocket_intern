const box = document.querySelector('.box')
box.style.backgroundColor = 'red'
box.style.height='500px'
box.style.padding='50px'
const button = document.querySelector('button')
button.onclick=()=>{
    

if(box.style.backgroundColor=='black'){
    box.style.backgroundColor='red'
    box.style.color='black'
}else{
    box.style.backgroundColor='black'
    box.style.color='red'
}
}