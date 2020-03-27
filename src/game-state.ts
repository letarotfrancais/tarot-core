import Player from './player'
import Card from './card'


export default class GameState {
  players: Player[]
  deck: Card[]
  dog: Card[]
  board: Card[]
  bids: { player: Player, contract: 'PASS'|'TAKE'|'GUARD' }[]
  get taker(): Player {
    return
  }
  get dealer(): Player {
    return
  }
}