

import React, { useState } from 'react'
import './Register.css'
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { registerUser } from '../../featrure/auth/authslice';
import { useNavigate } from 'react-router-dom';

export default function 
() {

  const[email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {error,loading } =useSelector((state)=>state.auth)

  const errorMessage=typeof error === "string"
      ? error
      : error?.message || error?.error || "Something went wrong";


  const registerFunction=async(e)=>{
   e.preventDefault();
   try {
     console.log(username,email,password)
     dispatch(registerUser({ username,email,password})).unwrap()
      
      toast.success("Registration Successfull Please Login!! ")
      navigate('/login')
   } catch (error) {
     toast.error(
          error?.message || "Registration failed"
        );
   }
  }
  return (
      <>
      <div className='login-form'>
        <div className='form-container'>
          <h2 className='heading-class'>Login</h2>
          <form className="form-container" onSubmit={registerFunction}>
            <div>
              <label htmlFor='username'>Username:</label>
              <input type='text' id="username" name='username' required value={username} onChange={(e)=>setUsername(e.target.value)}     />
            </div>
          <div className='email-class'>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
        
          <div className='password-class'>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
            {error && <p className="error-message">{errorMessage}</p>}
          <div className='button-class'>
            <button type="submit" disabled={loading}>
              {loading ? "Register in..." : "Register"}
              </button>
          </div>
         
          </form>
        </div>
      </div>
      

    </>
  )
}
