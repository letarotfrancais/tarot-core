import Player from './player'
import Card from './card'
import Deck from './deck'
import { Bid } from './types'

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
    let { player } = this.bids.sort((a, b) => b.contract - a.contract )[0]
    return player
  }
  static copy(state: GameState) {
    return Object.assign({}, state) // TODO use _.deepClone
  }
}