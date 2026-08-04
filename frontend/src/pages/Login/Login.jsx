


import { useDispatch } from "react-redux";
import { loginUser } from "../../featrure/auth/authslice";
import React,{useState} from 'react'
import './Login.css'
export default function Login() {
  const dispatch = useDispatch();
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const loginFunction=(e)=>{
    e.preventDefault();
    console.log(email)
    console.log(password)
      dispatch(
    loginUser({
      email,
      password,
    })
  );
  }
  return (
    <>
      <div className='login-form'>
        <div className='form-container'>
          <h2 className='heading-class'>Login</h2>
          <form className="form-container" onSubmit={loginFunction}>
          <div className='email-class'>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='password-class'>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className='button-class'>
            <button type="submit" onClick={loginFunction}>Login</button>
          </div>
          <div className='not-user-class'>
            <a href="/register">Not a user? Register here</a>
          </div>
          </form>
        </div>
      </div>
      

    </>
  )
}
