import Card from './card'
import TrumpCard from './trump-card'
import FoolCard from './fool-card'
import { SuitColor } from './types'

export default class SuitCard extends Card {
  color: SuitColor
  constructor(index: number, value: number, color: SuitColor, name: string) {
    super(index, value, name)
    this.color = color
  }
  get sortCriteria() {
    return `${super.sortCriteria}${this.color}${this.index}`
  }
  isPlayable(board: Array<Card>, hand: Array<Card>): boolean {
    super.isPlayable(board, hand)

    // if this is the first  card to be played
    if (!board.length) {
      return true
    }

    let [boardFirstCard] = board

    // if the board color is the same as this card
    if (boardFirstCard instanceof SuitCard && boardFirstCard.color === this.color) {
      return true
    }

    // if the first and only card played is the Fool card, this card will set the trick type and color
    if (board.length === 1 && boardFirstCard instanceof FoolCard) {
      return true
    }

    // if the hand has no card of the board color and no TrumpCard (pisser)
    if (!hand.some(card => {
          return card instanceof SuitCard  && boardFirstCard instanceof SuitCard && card.color === boardFirstCard.color
        }) &&
        !hand.some(card => card instanceof TrumpCard)) {
      return true
    }

    return false
  }
}