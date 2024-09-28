import React from 'react';
import Card from './Card';

function Table({ tableCards, getCardImageUrl }) {
  return (
    <div className='card'>
      {tableCards.map((card, index) => (
        <Card
          key={index}
          rank={card[0]}
          suit={card[1]}
          imageUrl={getCardImageUrl(card[0], card[1])}
        />
      ))}
    </div>
  );
}

export default Table;
