import GameState from './game-state'
import Player from './player'
import Deck from './deck'
import Card from './card'

export enum CardType {
  Suit = 'SUIT',
  Trump = 'TRUMP',
  Fool = 'FOOL'
}

export enum SuitColor {
  Spade = 'SPADE',
  Heart = 'HEART',
  Diamond = 'DIAMOND',
  Club = 'CLUB'
}

export enum Contract {
  Pass = 'PASS',
  Take = 'TAKE',
  Guard = 'GUARD'
}

export enum Action {
  Deal = 'deal',
  Bid = 'bid',
  Discard = 'discard',
  Play = 'play'
}

export interface Bid {
  player: Player
  contract: Contract
}

export interface HistoryEntry {
  action: Action
  payload: {}
  state: GameState
}

export interface GameStateData {
  dogDealSize: number
  dogMaxSize: number
  handDealSize: number
  players: Array<Player>
  deck: Deck
  dog: Array<Card>
  board: Array<Card>
  bids: Array<Bid>
}