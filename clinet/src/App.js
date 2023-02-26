import AppBar from './components/AppBar.js';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getUser } from './store/auth.js';


function App() {
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser())
  },[])
  
  console.log(auth);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;


