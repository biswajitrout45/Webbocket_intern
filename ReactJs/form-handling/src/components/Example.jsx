import {useRef} from 'react'
const Example = () => {
    const buttonRef =useRef();
    const headingRef =useRef();

    const handleClick=()=>{
        headingRef.current.style.color='red';
        buttonRef.current.style.backgroundColor='green';
    }
  return (
    <div className='p-5 text-center '>
        <h1 ref={headingRef} className='text-xl font-bold color-red '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium aut possimus quos. Quidem, ad repellendus fugit perferendis rem quasi optio saepe voluptates perspiciatis doloremque sequi nesciunt at enim odio libero.</h1>
        <button ref={buttonRef} onClick={handleClick} className=' bg-cyan-400 p-2 text-white font-bold cursor-pointer'>Click Me</button>
    </div>
  )
}

export default Example