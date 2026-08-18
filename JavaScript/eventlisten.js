const button = document.querySelector('button')

function handle(){
    button.style.color='white'
    button.style.backgroundColor="cyan"

    const div = document.createElement('div')
    div.textContent = "Button is clicked"
    button.after(div)
}
button.addEventListener('dblclick',handle)

setTimeout(() => {
    button.removeEventListener('dblclick',handle)
}, 10000);