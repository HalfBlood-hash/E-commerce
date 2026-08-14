



import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../featrure/auth/authslice";
import React,{useState} from 'react'
import './Login.css'




export default function Login() {


  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const navigate = useNavigate();




  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || error?.error || "Something went wrong";

  const loginFunction=async(e)=>{
    e.preventDefault();
    
    try {
      await dispatch(loginUser({username,password})).unwrap();
      toast.success("Login Successfull!! ")
      navigate('/')
    } catch (error) {
          toast.error(
      error?.message || "Login failed"
    );

    }
  
  }



  return (
    <>
      <div className='login-form'>
        <div className='form-container'>
          <h2 className='heading-class'>Login</h2>
          <form className="form-container" onSubmit={loginFunction}>
         <div>
              <label htmlFor='username'>Username:</label>
              <input type='text' id="username" name='username' required value={username} onChange={(e)=>setUsername(e.target.value)}     />
            </div>
          <div className='password-class'>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          {error && <p className="error-message">{errorMessage}</p>}

          <div className='button-class'>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
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
