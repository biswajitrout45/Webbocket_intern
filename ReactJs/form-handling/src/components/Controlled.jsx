import {useState} from 'react'
const Controlled = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [address,setAddress]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const data ={
            name,
            email,
            password,
            address
        };
        console.log(data);
    };



  return (
    <form onSubmit={handleSubmit} className='ml-5 mt-5 flex w-1/3 flex-col items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-5 shadow-lg transition-shadow hover:shadow-xl'>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name' className='mb-2 w-1/2 rounded-lg border border-black bg-white px-3 py-2 outline-none transition duration-200 placeholder:text-gray-500 hover:border-cyan-700 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/40' />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' className='mb-2 w-1/2 rounded-lg border border-black bg-white px-3 py-2 outline-none transition duration-200 placeholder:text-gray-500 hover:border-cyan-700 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/40'/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' className='mb-2 w-1/2 rounded-lg border border-black bg-white px-3 py-2 outline-none transition duration-200 placeholder:text-gray-500 hover:border-cyan-700 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/40'/>
        <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder='Address' className='mb-2 w-1/2 rounded-lg border border-black bg-white px-3 py-2 outline-none transition duration-200 placeholder:text-gray-500 hover:border-cyan-700 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/40'/>
        <button onClick={handleSubmit}  type='submit' className='mb-2 w-1/4 rounded-xl bg-purple-400 px-3 py-2 transition duration-200 hover:bg-purple-500 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2'>Submit</button>
    </form>
  )
}

export default Controlled