import axios, { AxiosResponse } from 'axios';

// TODO: create interface for responses
interface deckResp {
  success: boolean;
  deck_id: string;
  shuffled: boolean,
  remaining: number
}

export interface card {
  image: string;
  value: string;
  suit: string;
  code: string;
}

interface drawResp {
  success: boolean;
  cards: card[];
  deck_id: string;
  shuffled?: boolean;
  remaining: number;
}

const CardsApi = {
  getDeck: async (numDecks = 1) => {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numDecks}`;
    const resp: AxiosResponse<deckResp> = await axios.get(url);
    return resp.data;
  },

  drawCards: async ( numCards:number, deck='new') => {
    const url = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${numCards}`
    const resp: AxiosResponse<drawResp> = await axios.get(url);
    return resp.data;
  },

  shuffle: async (deck:string) => {
    const url = `https://deckofcardsapi.com/api/deck/${deck}/shuffle/`
    const resp: AxiosResponse<Omit<drawResp, "cards">> = await axios.get(url);
    return resp.data;
  }
}

export default CardsApi;
