



import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getCurrentUser } from "./featrure/auth/authslice";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import './App.css';
import ProtectedRoute from "./Global/ProtectedRoute";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Rootlayout from './Global/RootLayout';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Register from './pages/RegisterPage/Register';
import Cart from "./pages/Cart";

function App() {

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(getCurrentUser())
},[dispatch])


  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Rootlayout/>}>
        <Route index element={<Home/>}/>

       /Private Route 

        <Route element={<ProtectedRoute/>}>
        <Route path='cart' element={<Cart/>}/>
        </Route>

      
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
         <Route path="*" element={<NotFoundPage/>} /> 
      </Route>
    )
  )
  return(<>
    <RouterProvider router={router} />
   <ToastContainer
        position="center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    
  </>)
}

export default App;
