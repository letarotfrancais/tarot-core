import Card from './card'
import Board from './board'
import TrumpCard from './trump-card'
import SuitCard from './suit-card'
import { SuitColor } from './types'

export default class Hand extends Array<Card> {
  get trumpCards(): Array<TrumpCard> {
    return this.filter(card => card instanceof TrumpCard)
  }
  get suitCards(): Array<Card> {
    return this.filter(card => card instanceof SuitCard)
  }
  getSuitCards(color: SuitColor): Array<Card> {
    return this.filter(card => card instanceof SuitCard && card.color === color)
  }
  getPlayableCards(board: Board): Array<Card> {
    return this.filter(card => card.isPlayable(board, this))
  }
}