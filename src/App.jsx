import React, { useEffect } from 'react'; 
import { useNavigate, Outlet } from 'react-router-dom';
import Login from "./Components/Login.jsx";
import Layout from "./Components/Layout.jsx";

function App() {
  const token = localStorage.getItem('accessToken');
  const navigate =  useNavigate()
  useEffect(()=>{
    if(!token) navigate('/login')

  },[token])
  return token ? <Layout><Outlet/></Layout>:<Login/>
}

export default App;
