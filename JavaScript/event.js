function handleClick(){
    const heading = document.createElement('h2')
    heading.textContent = "Heading is clicked"

    const btn = document.querySelector('button')
    btn.after(heading)
}

const button = document.getElementById('btn')
button.ondblclick=()=>{
    button.style.color='white'
    button.style.backgroundColor="cyan"
}

const input = document.querySelector('input')

input.onchange=(e)=>{
    console.log(e);
    console.log(e.target)
    console.log(e.type)
    console.log(e.target.value)
}