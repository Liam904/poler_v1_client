import React from 'react';

function Card({ rank, suit, imageUrl, onClick, isClickable = false }) {
  return (
    <img
      className='card-image'
      src={imageUrl}
      alt={`Card ${rank} of ${suit}`}
      style={{ width: '100px', height: '150px', margin: '10px', cursor: isClickable ? 'pointer' : 'default' }}
      onClick={isClickable ? () => onClick(rank, suit) : null}
    />
  );
}

export default Card;
