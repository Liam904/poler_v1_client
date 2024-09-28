import React from 'react';
import Card from './Card';

function Hand({ hand, onClick, isPlayer = false, getCardImageUrl }) {
  return (
    <div className='card'>
      {hand.map((card, index) => (
        <Card
          key={index}
          rank={card[0]}
          suit={card[1]}
          imageUrl={getCardImageUrl(card[0], card[1])}
          onClick={onClick}
          isClickable={isPlayer}
        />
      ))}
    </div>
  );
}

export default Hand;
