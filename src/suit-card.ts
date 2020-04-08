import Card from './card'
import TrumpCard from './trump-card'
import FoolCard from './fool-card'
import { SuitColor } from './types'
import Board from './board'
import Hand from './hand'

export default class SuitCard extends Card {
  color: SuitColor // TODO rename 'color' into 'suit'
  constructor(index: number, value: number, color: SuitColor, name: string) {
    super(index, value, name)
    this.id = `${color}_${index}`
    this.color = color
  }
  get sortCriteria() { // TODO delete if not used
    return `${super.sortCriteria}${this.color}${this.index}`
  }
  isPlayable(board: Board, hand: Hand): boolean {
    super.isPlayable(board, hand)

    if (!board.followSuitCard) {
      return true
    }

    if (board.followSuitCard instanceof TrumpCard) {
      if (hand.trumpCards.length) {
        return false
      }
      return true
    }

    if (board.followSuitCard instanceof SuitCard) {
      if (this.color === board.followSuitCard.color) {
        return true
      }
      if (hand.getSuitCards(board.followSuitCard.color).length) {
        return false
      }
      if (hand.trumpCards.length) {
        return false
      }
      return true
    }
  }
}