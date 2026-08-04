
import './App.css';
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

function App() {
  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Rootlayout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
         <Route path="*" element={<NotFoundPage/>} /> 
      </Route>
    )
  )
  return(<>
    <RouterProvider router={router} />
 
  </>)
}

export default App;
