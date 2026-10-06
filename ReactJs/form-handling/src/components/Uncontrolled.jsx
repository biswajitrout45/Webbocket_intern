import { useRef } from 'react'

const Uncontrolled = () => {
    const nameRef =useRef();
    const emailRef =useRef();
    const passwordRef =useRef();
    const addressRef =useRef();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const name =nameRef.current.value;
        const email =emailRef.current.value;
        const password =passwordRef.current.value;
        const address =addressRef.current.value;
    
    const data ={
        name,
        email,
        password,
        address
    };
    console.log(data);
};
  return (
    <form className='ml-5 mt-5 flex flex-col justify-center items-center gap-2 px-5 py-5 bg-slate-400 w-1/3 h-1/3 '>
        <input ref={nameRef} type="text" placeholder='Name' className='mb-2 w-1/2 border border-black bg-white rounded rounded-lg  ' />
        <input ref={emailRef} type="email" placeholder='Email' className='mb-2 w-1/2 border border-black bg-white rounded rounded-lg  '/>
        <input ref={passwordRef} type="password" placeholder='Password' className='mb-2 w-1/2 border border-black bg-white rounded rounded-lg  '/>
        <input ref={addressRef} type="text" placeholder='Address' className='mb-2 w-1/2 border border-black bg-white rounded rounded-lg  '/>
        <button onClick={handleSubmit} type='submit'className='mb-2 w-1/4 border-none  bg-purple-400 rounded rounded-xl  '>Submit</button>
    </form>
  )
}
export default Uncontrolled;