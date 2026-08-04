

import {Outlet} from 'react-router-dom'
import Header from '../component/Header/Header'
import Footer from '../component/Footer/Footer'
export default function Rootlayout(){

    return (
        <>
        <Header/>
        <div style={{ margin: 0 , backgroundColor: '#08f218'}} className='root-layout' >
        <Outlet/>
        </div>
        <Footer/>
        </>
    )
}