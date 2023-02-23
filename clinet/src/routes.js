import Login from './pages/Login'
import Home from './pages/Home';
import Register from './pages/Register';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import CheckAuth from './utils/CheckAuth';




export default createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
        //   element: token? <Home /> :  <Navigate to="/login" replace={true} />,
        element: <CheckAuth>
            <Home />
        </CheckAuth>
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