function handleClick(){
    const heading = document.createElement('div')
    heading.className = "Profile"
    heading.innerHTML = `<img src="https://cdn.pixabay.com/photo/2026/07/20/12/10/12-10-28-467_1280.jpg" class="img" alt="">
    <h1 class="name">Biswajit Rout</h1>
    <p class="p">Web Designer</p>
    <button class="btn">Contact</button>
    `
    const button = document.querySelector('button')
    button.after(heading)
}