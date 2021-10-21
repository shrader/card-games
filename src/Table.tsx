import React, { useState, useEffect } from 'react';
import CardsApi, {card} from './CardsApi';
import PlayerHand from './PlayerHand';
import {convertCardValue} from './helprers';

interface player {
  playerNum: number;
  cards: card[];
  handTotal: number;
}

const dealer:player = {
  playerNum: 0,
  cards: [],
  handTotal: 0
};

const defaultPlayer:player = {
  playerNum: 1,
  cards: [],
  handTotal: 0
};

const Table = () => {
  const [dealerHand, setDealerHand] = useState(dealer);
  // const [numPlayers, setNumPlayers] = useState(1);
  const [deckId, setDeckId] = useState<string>();
  const [playerData, setPlayerData] = useState(defaultPlayer);
  const [isHit, setIsHit] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState(0);

  // just start drawing and save the deck id from the response, unless you start to decide to use multiple decks

  const setHands = async () => {
    const draw1 = await CardsApi.drawCards(2, deckId);
    if (!deckId) {
      setDeckId(draw1.deck_id);
    }
    const draw2 = await CardsApi.drawCards(2, deckId || draw1.deck_id);
    setCardsRemaining(draw2.remaining);
    console.log("remaining:", draw2.remaining);
    console.log("deck_id:",draw2.deck_id);
    // console.log("deck_id used for draw:",deckId);
    setDealerHand({...dealerHand, cards:[draw1.cards[0], draw1.cards[1]]});
    setPlayerData({...playerData, cards:[draw2.cards[0], draw2.cards[1]]});
  }

  // If cards remaining === 0 then shuffle the deck

  const displayCardValue = (cards:card[]) => {
    let total = 0;
    if (cards) {
      for (let card of cards) {
        const value = convertCardValue(card.code);
        if (value) {
          total += value;
        }
      }
      return total;
    }
  }

  const handleBtnClick = () => {
    isHit? setIsHit(false) : setIsHit(true);
  }

  const DisplayCards = () => {
    if (dealerHand?.cards[0]?.code && playerData?.cards[0]?.code) {
      return (
        <div>
          <h1>Dealer hand {`${displayCardValue(dealerHand?.cards)}`}</h1>
          <PlayerHand cards={dealerHand.cards} />
          <h1>Player hand {`${displayCardValue(playerData.cards)}`}</h1>
          <PlayerHand cards={playerData.cards} />
          <h1> Cards Reamining In Deck {cardsRemaining}</h1>
        </div>
      )
    } else {
      return <h2>Cards not ready</h2>
    }
  }
  
  
    // set deck based on response
    // setDeckId(cardData.deck_id);
    // set dealer hand based on response

  useEffect(() => {
    setHands();
  }, [isHit]);
  return (
    <div>
      {/* for each player return player component */}
      <DisplayCards />
      <button onClick={handleBtnClick}>Test</button>
      {`${isHit}`}
    </div>
  )
}

export default Table;