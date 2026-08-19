const allproducts = document.querySelector('.products')

function showProducts(){
    fetch('https://dummyjson.com/products')
    .then((res)=>{
        res.json()
        .then((data)=>{
            data.products.forEach((item)=>{
                const img = document.createElement('img')
                const title = document.createElement('h3')
                const price = document.createElement('h5')
                const description = document.createElement('p')

                const product = document.createElement('div')
                product.setAttribute('class','product')

                img.src = item.images[0]
                title.textContent = item.title
                price.textContent = "$" + item.price
                description.textContent = item.description

                product.append(img,title,price,description)

                allproducts.append(product)
            })
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

document.getElementById('btn').onclick = () => {
    showProducts()
}