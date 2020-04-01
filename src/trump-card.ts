import Card from './card'
import Fool from './fool-card'
import SuitCard from './suit-card'
import { TRUMP_OUDLERS } from './constants'

export default class TrumpCard extends Card {
  constructor(index, value) {
    super(index, value, `${index}`)
    if (TRUMP_OUDLERS.includes(index)) {
      this.isOudler = true
    }
  }
  get sortCriteria() {
    return `${super.sortCriteria}${this.index}`
  }
  isPlayable(board: Array<Card>, hand: Array<Card>) {
    super.isPlayable(board, hand)

    let { index: boardMaxIndex } = board.length ? board.reduce((prev, current) => prev.index > current.index ? prev : current) : { index: 0 }

    // if this is the first  card to be played
    if (!board.length) {
      return true
    }

    let [boardFirstCard] = board

    // if the first and only card played is the Fool, this card will set the trick type
    if (board.length === 1 && boardFirstCard instanceof Fool) {
      return true
    }

    // if the board first card and this card are trump cards
    // or if the board first card is the Fool and the 2nd one is a trump card
    // or if hand does not contain the color of the first card of the game
    if (boardFirstCard instanceof TrumpCard
      || (boardFirstCard instanceof Fool && board[1] instanceof TrumpCard)
      || !hand.some(card => {
        return card instanceof SuitCard  && boardFirstCard instanceof SuitCard && card.color === boardFirstCard.color
      })) {
      // if the hand does not contain any TrumpCard stronger than those on the board
      // or this TrumpCard is stronger than any TrumpCard on the board
      if (this.index > boardMaxIndex
        || !hand.some(card => card !== this && card.index > boardMaxIndex)) {
          return true
      }
    }
  }
}