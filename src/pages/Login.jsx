import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {

    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const[ error,setError ] = useState(null)
    const { login } = useAuth()
    
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
       
        e.preventDefault();
        try{
            const response = await axios.post('https://ems-api-rouge.vercel.app/api/auth/login',{email,password});
            
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                    
                } else {
                    navigate('/employee-dashboard')
                }
                toast.success("Logged in")
            }
        } catch(error){       
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
                toast.error(error.response.data.message)
            }  else {
                    setError("server error")
                }
        }
    }

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6' >
        <h2 className='font-sevillana text-3xl text-white' >Employee Management System</h2>
        <div className='border shadow p-6 w-80 bg-white' 
        >
            <h2 className='text-2xl font-bold mb-4' >Login</h2>
            { error && <p className='text-red-500' >{error}</p> }    
            <form onSubmit={handleSubmit} >
            <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700' >Email</label>
                <input type="email" className='w-full px-3 py-2 border' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required />
            </div>
            <div className='mb-4' >
                <label htmlFor="password" className='block text-gray-700' >Password</label>
                <input type="password" className='w-full px-3 py-2 border' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required />
            </div>
            <div className='mb-4' >
                <button
                    type='submit'
                    className='w-full bg-teal-600 text-white py-2'
                >Login</button>
            </div>   

            <div className='mb-4 flex items-center justify-between' >
                <label className='inline-flex items-center' >
                    <span className='ml-2 text-gray-700' > Don't have an account? </span>
                </label>
                <Link to='/signup' className='text-teal-600 underline' >Signup </Link>
            </div>

        </form>
        </div>
    </div>
  )
}

export default Login