import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/style.css";
import { useNavigate } from "react-router-dom";
import getToken from '../../auth/getToken';
import { handleLogout } from '../../auth/Login';

function NewGame() {
  const navigate = useNavigate()
  const token  =getToken()
  const apiUrl = import.meta.env.REACT_APP_API_URL; 

    function createGame() {
        axios.post("https://pokerv1backend-production.up.railway.app/new_game", {}, {
          headers:{
             "Authorization": `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log(res.data.message);
         navigate("/")
        })

        .catch((err) => {
          console.error("Error creating a new game:", err);
        });
    }


    return (
      <div>
    <div className='nav'>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
          <li><a href="/">Dashboard</a></li>
          <button className='btn-nav' onClick={handleLogout}>Logout</button>
          
        </ul>
      </nav>
      </div>
      <div className='section'>
        
        <div className="new-game">
          <div className="container-1">
            <button className='btn-1' onClick={createGame}>New Game</button>
            <button className='btn-1 '>Resume Game</button>
            <button className='btn-1 '>Quit</button>
        </div>
        </div>
    </div>

      </div>
    );
}

export default NewGame;
