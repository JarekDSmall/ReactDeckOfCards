import React, { useState, useEffect } from 'react';
import Card from './Card';

function Deck() {
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    createDeck();
  }, []);

  const createDeck = async () => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    setDeck(data);
  };

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

  const shuffleDeck = async () => {
    setIsShuffling(true);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
    const data = await response.json();
    setDeck(data);
    setCurrentCard(null); // Remove the current card from the screen
    setIsShuffling(false);
  };

  return (
    <div>
      <button onClick={drawCard} disabled={isShuffling}>Draw a Card</button>
      <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
      {currentCard && <Card card={currentCard} />}
    </div>
  );
}

export default Deck;
