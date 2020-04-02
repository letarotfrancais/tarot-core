import Card from './card'
import Board from './board'

export default class Hand extends Array<Card> {
  getPlayableCards(board: Board): Array<Card> {
    return this.filter(card => card.isPlayable(board, this))
  }
}