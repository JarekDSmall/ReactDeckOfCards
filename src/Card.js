import React from 'react';

function Card({ card }) {
  return (
    <div>
      <img src={card.image} alt={card.value + ' of ' + card.suit} />
    </div>
  );
}

export default Card;
