import Card from './card'
import FoolCard from './fool-card'
import SuitCard from './suit-card'
import { TRUMP_OUDLERS } from './constants'
import Board from './board'
import Hand from './hand'

export default class TrumpCard extends Card {
  constructor(index, value) {
    super(index, value, `${index}`)
    this.id = `TRUMP_${index}` // TODO maybe this.type might be useful for building the id
    if (TRUMP_OUDLERS.includes(index)) {
      this.isOudler = true
    }
  }
  get sortCriteria() { // TODO delete if not used
    return `${super.sortCriteria}${this.index}`
  }
  isPlayable(board: Board, hand: Hand): boolean {
    super.isPlayable(board, hand)

    if (!board.followSuitCard) {
      return true
    }

    if (board.followSuitCard instanceof TrumpCard) {
      if (this.index > board.bestTrumpCard.index) {
        return true
      }
      if (hand.trumpCards.some(card => card.index > board.bestTrumpCard.index)) {
        return false
      }
      return true
    }

    if (board.followSuitCard instanceof SuitCard) {
      if (hand.getSuitCards(board.followSuitCard.color).length) {
        return false
      }
      console.log('LOGLOGLOGOLOG', board.bestTrumpCard);

      if (board.hasTrumpCards && hand.trumpCards.some(card => card.index > board.bestTrumpCard.index)) {
        return false
      }
      return true
    }
  }
}