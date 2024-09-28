import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import NewGame from './components/game/NewGame';
import Login from './auth/Login';
import Signup from './auth/Signup'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
        <Route path='/new_game' element={<NewGame />} />
        <Route path='/' element={<Dashboard />} />

        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      </BrowserRouter>


    </div>
  )
}

export default App