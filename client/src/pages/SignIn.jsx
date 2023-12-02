import {Link , useNavigate} from 'react-router-dom';

import { useState } from 'react';



const SignIn = () => {

  const [fomrData, setFormData] = useState({});

  const [error, setError] = useState(null);

  const [loding, setLoding] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...fomrData, 
      [e.target.id]: e.target.value,
    })
  };

  
  const handelSubmit = async (e)=>{
    
    e.preventDefault();


    try {
      setLoding(true);

      console.log(fomrData);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fomrData),
      });

      const data = await res.json();
      
      if(data.success === false){
        setError(data.message);
        setLoding(false);
        return;
      }

      setLoding(false);

      setError(null);

      navigate('/')
      // console.log(data);

    } catch (error) {
      setLoding(false);
      setError(error.message);
    }

    
  
  }




  return (
    <div  className=' p-3 max-w-lg mx-auto'>
      
      <h1 className=' text-3xl text-center font-semibold my-7'>Sign In</h1>
      
      <form onSubmit={handelSubmit} className=' flex flex-col gap-4'>
    
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>

        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>

        <button disabled={loding} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loding? "Loding..." : "Sign in"}</button>
      
      </form>

      <div className=' flex gap-2 mt-5'>
      
        <p>Dont Have an Account?</p>
      
        <Link to={"/sign-up"} >
          <span className="text-blue-600">SIgn up</span>
        </Link>
      
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    
    </div>
  )
}

export default SignIn