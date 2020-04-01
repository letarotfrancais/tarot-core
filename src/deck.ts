import Card from './card'
import Fool from './fool-card'
import TrumpCard from './trump-card'
import SuitCard from './suit-card'
// TODO reimplement shuffle
// import { shuffle } from './utils'

import {
  TRUMP_OUDLERS,
  BASE_VALUE, OUDLER_VALUE,
  SUIT_CARD_FACE_FIRST_INDEX, SUIT_CARD_NAMES, SUIT_CARD_FACE_VALUES
} from './constants'
import { SuitColor } from './types'

export default class Deck extends Array<Card> {
  constructor() {
    super()

    // Fool
    this.push(new Fool())
    // Trump cards
    for (let index = 1; index <= 21; index++) {
      let value = BASE_VALUE
      // Oudlers
      if (TRUMP_OUDLERS.includes(index)) {
        value = OUDLER_VALUE
      }
      this.push(new TrumpCard(index, value))
    }
    // Suit cards
    [SuitColor.Spade, SuitColor.Heart, SuitColor.Diamond, SuitColor.Club].forEach(color => {
      // Pip cards
      for (let cardIndex = 1; cardIndex < SUIT_CARD_FACE_FIRST_INDEX; cardIndex++) {
        this.push(new SuitCard(
          cardIndex,
          BASE_VALUE,
          color,
          SUIT_CARD_NAMES[cardIndex - 1]
        ))
      }
      // Face cards
      for (let cardIndex = 11; cardIndex <= 14; cardIndex++) {
        this.push(new SuitCard(
          cardIndex,
          SUIT_CARD_FACE_VALUES[cardIndex - SUIT_CARD_FACE_FIRST_INDEX],
          color,
          SUIT_CARD_NAMES[cardIndex - 1]
        ))
      }
    })
  }
  // shuffle() {
  //   shuffle([...this], CardCollection.compare).forEach((card, index) => this[index] = card)
  // }
}