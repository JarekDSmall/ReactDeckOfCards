import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

function Deck() {
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawInterval = useRef(null);

  useEffect(() => {
    createDeck();
  }, []);

  const createDeck = async () => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    setDeck(data);
  };

  const drawSingleCard = async () => {
    if (!deck) return;
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await response.json();
    if (data.remaining === 0) {
      alert("Error: no cards remaining!");
      return;
    }
    setCurrentCard(data.cards[0]);
  };

  const drawCard = async () => {
    if (deck.remaining === 0) {
      alert('Error: no cards remaining!');
      stopDrawing();
      return;
    }
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await response.json();
    setCurrentCard(data.cards[0]);
    setDeck(prevState => ({ ...prevState, remaining: prevState.remaining - 1 }));
  };

  const startDrawing = () => {
    setIsDrawing(true);
    drawInterval.current = setInterval(drawCard, 1000);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    clearInterval(drawInterval.current);
  };

  const toggleDrawing = () => {
    if (isDrawing) {
      stopDrawing();
    } else {
      startDrawing();
    }
  };

  return (
    <div>
      <button onClick={drawSingleCard} disabled={isDrawing}>
        Draw a Card
      </button>
      <button onClick={toggleDrawing}>
        {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
      </button>
      <button onClick={shuffleDeck} disabled={isDrawing}>
        Shuffle Deck
      </button>
      {currentCard && <Card card={currentCard} />}
    </div>
  );
}

export default Deck;
