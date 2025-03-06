import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Components/Login.jsx";
import Banners from '../Components/Banners.jsx'
import App from "../App.jsx";

export const Router = createBrowserRouter([
    {
    path: "/",
    element: <App/>,
    children:[
    {
        path: "/",
        element: <Banners/>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    ],
},
]);