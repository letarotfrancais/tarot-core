// @ts-ignore
import lodash from 'lodash'
import Player from './player'
import Card from './card'
import Deck from './deck'
import { IBid, IGameConfig, IGameState } from './types'
import { CONTRACTS_ORDER } from './constants'

const { cloneDeep, assign } = lodash

export default class GameState {
  dogDealSize: number
  dogMaxSize: number
  handDealSize: number
  players: Array<Player>
  deck: Deck
  dog: Array<Card>
  board: Array<Card>
  bids: Array<IBid>

  currentPlayer: Player
  get nextPlayer() {
    let { players, currentPlayer } = this
    return players[players.indexOf(currentPlayer) + 1]
  }
  get taker(): Player {
    let { player } = this.bids.sort((a, b) => {
      return CONTRACTS_ORDER.indexOf(b.contract) - CONTRACTS_ORDER.indexOf(a.contract)
    })[0]
    return player
  }
  constructor(gameStateData: IGameState) {
    Object.assign(this, gameStateData)
    this.currentPlayer = this.players[0]
  }
  static copy(state: GameState) {
    let gameState = cloneDeep(state)
    return new GameState(gameState)
  }
  static makeFromConfig(config: IGameConfig): GameState {
    let state = assign(cloneDeep(config), {
      deck: new Deck(),
      dog: [],
      board: [],
      bids: []
    })
    return new GameState(state)
  }
}