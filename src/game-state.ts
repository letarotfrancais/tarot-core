// @ts-ignore
import lodash from 'lodash'
import Player from './player'
import Card from './card'
import Deck from './deck'
import { IBid, IGameConfig, IGameState } from './types'
import Board from './board'
import Players from './players'

const { cloneDeep, assign } = lodash

export default class GameState {
  dogDealSize: number
  dogMaxSize: number
  handDealSize: number
  players: Players
  deck: Deck
  dog: Array<Card>
  board: Board
  bids: Array<IBid>

  currentPlayer: Player
  taker: Player
  get nextPlayer() {
    let { players, currentPlayer } = this
    return players[players.indexOf(currentPlayer) + 1]
  }
  constructor(gameStateData: IGameState) {
    assign(this, gameStateData)
    this.currentPlayer = this.players.first
  }
  static copy(state: GameState) {
    let gameState = cloneDeep(state)
    return new GameState(gameState)
  }
  static makeFromConfig(config: IGameConfig): GameState {
    let state = assign(cloneDeep(config), {
      deck: new Deck(),
      dog: [],
      board: new Board(),
      bids: [],
      players: new Players(...config.players)
    })
    return new GameState(state)
  }
}