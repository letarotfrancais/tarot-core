// @ts-ignore
import lodash from 'lodash'
import Player from './player'
import Card from './card'
import Deck from './deck'
import { Bid } from './types'
import { CONTRACTS_ORDER } from './constants'
import { GameStateData } from './types'

const { cloneDeep } = lodash

export default class GameState {
  dogDealSize: number
  dogMaxSize: number
  handDealSize: number
  players: Array<Player>
  deck: Deck
  dog: Array<Card>
  board: Array<Card>
  bids: Array<Bid>

  currentPlayer: Player
  get nextPlayer() {
    let { players, currentPlayer } = this
    return players[players.indexOf(currentPlayer) + 1]
  }
  get taker(): Player {
    let { player } = this.bids.sort((a, b) => CONTRACTS_ORDER.indexOf(b.contract) - CONTRACTS_ORDER.indexOf(a.contract) )[0]
    return player
  }
  constructor(gameStateData: GameStateData) {
    Object.assign(this, gameStateData)
  }
  static copy(state: GameState) {
    let gameState = cloneDeep(state)
    return new GameState(gameState)
  }
}