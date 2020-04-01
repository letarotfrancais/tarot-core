import Card from './card'
import TrumpCard from './trump-card'
import SuitCard from './suit-card'

export default class Board extends Array<Card> {
  get hasTrumpCard() {
    return this.some(card => card instanceof TrumpCard)
  }
  get bestTrumpCard() {
    return this
      .filter(card => card instanceof TrumpCard)
      .reduce((best, card) => card.index > best.index ? card : best)
  }
  get bestSuitCard() {
    let suitCards = this.filter(card => card instanceof SuitCard)
    let [firstSuitCard] = suitCards
    return suitCards
      .filter(card => card instanceof SuitCard && firstSuitCard instanceof SuitCard && card.color === firstSuitCard.color)
      .reduce((best, card) => card.index > best.index ? card : best)
  }
  get bestCard() {
    // if there's any trump, we can ignore suit cards
    if (this.hasTrumpCard) {
      return this.bestTrumpCard
    }

    // else get the best suit card of the same color as the first card
    return this.bestSuitCard
  }
}