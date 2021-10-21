import React from 'react';
import {card} from './CardsApi';
import './PlayerHand.css';

interface Props {
  cards: card[];
}

const PlayerHand = ({cards}:Props) => {
  return (
    <div className={'card-holder'}>
      <ul className={'card-list'}>
      {cards.map((card:card, idx) => (
        <li key={idx}><img className={'card-img'} src={card.image} alt=''/></li>
      ))}
      </ul>
    </div>
  )
}

export default PlayerHand;
