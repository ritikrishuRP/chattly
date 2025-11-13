import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import getCurrentUser from './customHooks/getCurrentUser';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  getCurrentUser()
  let {userData}=useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/login' element={!userData? <Login/> : <Navigate to="/"/>}/>
      <Route path='/signup' element={!userData? <SignUp/> : <Navigate to="/"/>}/>
      <Route path='/' element={userData? <Profile/> : <Navigate to="/login"/> }/>
      <Route path='/profile' element={userData? <Profile/> : <Navigate to="/login"/> }/>
    </Routes>
  )
}

export default App;
