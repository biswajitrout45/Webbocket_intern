import {useState, useEffect} from 'react'
import axios from 'axios'
const Product = () => {
    const [AllProducts,setAllProducts] = useState([]);

    const getProduct = () => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        getProduct();
    }, []);
    
    return(
        <main className='mx-auto min-h-screen w-[calc(100%-24px)] max-w-[1180px] bg-stone-100 px-0 py-9 text-slate-800 sm:w-[calc(100%-32px)] sm:py-14'>
            <h1 className='mb-3 text-5xl font-bold leading-none tracking-tight text-teal-900 sm:text-7xl'>Product collection</h1>
            <p className='mb-9 max-w-xl leading-relaxed text-stone-500'>Explore practical pieces selected for everyday use, with a little room for delight.</p>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                {AllProducts.length === 0 && <p className='text-stone-500'>Loading products...</p>}
                {AllProducts.map((product) => (
                    <article className='flex min-h-[390px] flex-col rounded-lg border border-teal-900/10 bg-white/80 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl' key={product.id}>
                        <div className='mb-[18px] grid min-h-[210px] place-items-center rounded-md bg-stone-200'>
                            <img className='h-[180px] w-[150px] object-contain mix-blend-multiply' src={product.image} alt={product.title} />
                        </div>
                        <h2 className='mb-3 font-sans text-base leading-relaxed text-slate-800'>{product.title}</h2>
                        <p className='mt-auto font-sans text-xl font-bold text-orange-700'>${product.price.toFixed(2)}</p>
                    </article>
                )
                    
                )}
            </div>
        </main>
    )
}

export default Product