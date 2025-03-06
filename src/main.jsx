import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'; // RouterProvider import qilindi
import { Router } from './Router/Router.jsx'; // Router komponentasini import qilish

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} /> {/* router propini to'g'ri uzatish */}
    <ToastContainer />
  </StrictMode>,
)
