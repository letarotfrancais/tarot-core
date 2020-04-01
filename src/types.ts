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
  Shuffle = 'shuffle',
  Deal = 'deal',
  Bid = 'bid',
  Discard = 'discard',
  Play = 'play'
}

export interface IBid {
  player: Player
  contract: Contract
}

export interface IHistoryEntry {
  action: Action
  payload: {}
  state: GameState
}

export interface IGameConfig {
  dogDealSize: number
  dogMaxSize: number
  handDealSize: number
  players: Array<Player>
}

export interface IGameState extends IGameConfig {
  deck: Deck
  dog: Array<Card>
  board: Array<Card>
  bids: Array<IBid>
}