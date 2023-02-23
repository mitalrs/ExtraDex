import Login from './pages/Login'
import Home from './pages/Home';
import Register from './pages/Register';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import Cookies from 'js-cookie';

const token = Cookies.get('token');


export default createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: token? <Home /> :  <Navigate to="/login" replace={true} />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        }
      ],
    },
  
  ]);