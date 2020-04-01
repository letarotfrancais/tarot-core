import Card from './card'
import { OUDLER_VALUE, FOOL_INDEX, FOOL_NAME } from './constants'

export default class FoolCard extends Card {
  constructor() {
    super(FOOL_INDEX, OUDLER_VALUE, FOOL_NAME)
    this.isOudler = true
  }
  isPlayable(board: Array<Card>, hand: Array<Card>) {
    super.isPlayable(board, hand)

    return true
  }
}