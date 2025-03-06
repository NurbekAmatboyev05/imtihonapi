import React from 'react'
import Login from "../Components/Login.jsx";
import Banners from '../Components/Banners.jsx'
import { useNavigate, Outlet, NavLink } from 'react-router-dom'; // NavLink import qilindi

function Layout() {
    const navigate = useNavigate();

    const Logout = () => {
      localStorage.removeItem('accessToken');
      navigate('/login');
    };
  return (
    <div>
    <header className='bg-gray-800 '>
      <h1 activeClassName="active" className='text-2xl text-right text-blue-300 cursor-pointer' onClick={Logout}>Log Out</h1>
    </header>
    <div className='grid grid-cols-12'>
      <div className='col-span-2 p-4 bg-gray-600  h-[94vh]'>
        <div> 
          <NavLink to="/"  className="text-white block p-2">Banners</NavLink>  
        </div>
        </div>
      <div className='bg-white col-span-10 p-4 overflow-y-scroll h-[94vh]'><Outlet/></div>
    </div>
  </div>
);
}

export default Layout;
