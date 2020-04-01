import GameState from './game-state'
import Player from './player'

export enum CardType {
  Suit = 0,
  Trump = 1,
  Fool = 2
}

export enum SuitColor {
  Spade = 'SPADE',
  Heart = 'HEART',
  Diamond = 'DIAMOND',
  Club = 'CLUB'
}

export enum Contract {
  Pass = 0,
  Take = 1,
  Guard = 2
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
