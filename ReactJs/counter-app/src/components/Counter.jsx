import { useState } from 'react'

const Counter = () => {
    const [count,setCount] = useState(0)
  return (
    <div className='text-3xl font-bold bg-blue-400 p-10 text-white rounded-xl w-1/3 mx-auto mt-50 '>
        <h1 className="text-4xl font-bold text-center">Count:{count}</h1>
        <div className='flex justify-center gap-5 mt-5'>
            <button className='bg-black px-8 py-2 rounded-full text-lg cursor-pointer' onClick={() => setCount(count - 1)}>Decrement</button>
            <button className='bg-black px-8 py-2 rounded-full text-lg cursor-pointer'onClick={() => setCount(0)}>Reset</button>
            <button className='bg-black px-8 py-2 rounded-full text-lg cursor-pointer' onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    </div>
  )
}

export default Counter