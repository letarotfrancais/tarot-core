import Card from './card'
import { OUDLER_VALUE, FOOL_INDEX, FOOL_NAME } from './constants'
import Board from './board'
import Hand from './hand'

export default class FoolCard extends Card {
  constructor() {
    super(FOOL_INDEX, OUDLER_VALUE, FOOL_NAME)
    this.id = FOOL_NAME
    this.isOudler = true
  }
  isPlayable(board: Board, hand: Hand): boolean {
    super.isPlayable(board, hand)

    return true
  }
}