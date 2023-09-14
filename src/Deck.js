import React, { useState, useEffect } from 'react';
import Card from './Card';

function Deck() {
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeck(data);
    }
    fetchData();
  }, []);

  const drawCard = async () => {
    if (deck.remaining === 0) {
      alert('Error: no cards remaining!');
      return;
    }
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await response.json();
    setCurrentCard(data.cards[0]);
    setDeck(prevState => ({ ...prevState, remaining: prevState.remaining - 1 }));
  };

  return (
    <div>
      <button onClick={drawCard}>Draw a Card</button>
      {currentCard && <Card card={currentCard} />}
    </div>
  );
}

export default Deck;
