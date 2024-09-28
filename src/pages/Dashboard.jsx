import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poker from 'poker-images';
import './css/style.css';
import getToken from '../auth/getToken';
import Hand from '../components/game/Hand';
import Table from '../components/game/Table';
import { createRoot } from 'react-dom/client'
import { handleLogout } from '../auth/Login';
import { Link, useNavigate } from 'react-router-dom';
  

function Dashboard() {
  const apiUrl = import.meta.env.REACT_APP_API_URL; 

  const token = getToken();
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [tableCard, setTableCard] = useState([]);
  const [winner, setWinner] = useState("")
  const navigate = useNavigate()




  function getCardImageUrl(rank, suit) {
    if (typeof rank !== 'string' || typeof suit !== 'string') {
      console.error("Invalid card data:", { rank, suit });
      return "";
    }
    const cardImage = Poker.getCardImage(90, suit, rank);
    return cardImage.src;
  }

  function pickCard() {
    axios.post("https://pokerv1backend-production.up.railway.app/pick", {}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        const card = res.data.picked_card[0];
        if (res.data) {
          setPlayerHand(prevPlayerHand =>
            prevPlayerHand.concat([card[0], card[1]])
          );
         renderGameData(res)
        
        }
      });
  }

  function renderGameData(res) {
    const { player_hand, computer_hand, table_card } = res.data;
    setComputerHand(computer_hand);
    setPlayerHand(player_hand);
    setTableCard(table_card);
  }

  function handleClick(rank, suit) {
    axios.post("https://pokerv1backend-production.up.railway.app/player_moves", {
      rank: rank,
      suit: suit
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.data){

        if (res.data.valid) {
          setPlayerHand(prevPlayerHand =>
            prevPlayerHand.filter(card => !(card[0] === rank && card[1] === suit))
          );
          setComputerHand(prevPlayerHand =>
            prevPlayerHand.filter(card => !(card[0] === rank && card[1] === suit))
          );
          setTableCard(prevTableCards =>
            prevTableCards.concat([rank, suit])
          );
          renderGameData(res);
        }

        if (!res.data.valid) {
          setPlayerHand(prevTableCards =>
            prevTableCards.concat([rank, suit])
          );
          renderGameData(res);
        }
        if (res.data.winner) {
          alert(`The winner is: ${res.data.winner}`);
        }
      }
      if(!res.data) {
        createRoot(document.getElementById('root')).render(<Dashboard />)
   
      }
   
  

      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  }

  useEffect(() => {
    axios.get("https://pokerv1backend-production.up.railway.app/game", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        // console.log(res.data);
        const { computer_hand, player_hand, table_card } = res.data;
        setComputerHand(computer_hand);
        setPlayerHand(player_hand);
        setTableCard(table_card);
         if (res.data.winner && (player_hand.length === 0 || computer_hand.length === 0 || player_hand.length >= 7 || computer_hand >= 7 )) {
          setWinner(res.data.winner)
        alert(`The winner is: ${res.data.winner}`);
        navigate("/new_game")
        
      }
      })

    
      .catch((error) => {
        console.error("Error making GET request:", error);
      });
  }, []);

  return (
    
    <div>
    <div className='nav'>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
          <li><a href="/new_game">NewGame</a></li>
          <button className='btn-nav' onClick={handleLogout}>Logout</button>
          
        </ul>
      </nav>
      </div>
    <div className='container-game'>
      <h3>Player's Hand</h3>
      <Hand
        hand={playerHand}
        onClick={handleClick}
        isPlayer={true}
        getCardImageUrl={getCardImageUrl}
      />

      <button className='btn-card' onClick={pickCard}>Pick</button>

      <h3>Computer's Hand</h3>
      <Hand
        hand={computerHand}
        getCardImageUrl={getCardImageUrl}
      />

      <h3>Table Cards</h3>
      <Table
        tableCards={tableCard}
        getCardImageUrl={getCardImageUrl}

      />
    </div>
    </div>
  );
}

export default Dashboard;
