import Card from './card'
import TrumpCard from './trump-card'
import SuitCard from './suit-card'
import FoolCard from './fool-card'

export default class Board extends Array<Card> {
  get followSuitCard(): Card {
    if (this.length === 0) {
      return undefined
    }
    if (this.length === 1 && this[0] instanceof FoolCard) {
      return undefined
    }
    if (this[0] instanceof FoolCard) {
      return this[1]
    }
    return this[0]
  }
  get hasTrumpCards(): boolean {
    return this.some(card => card instanceof TrumpCard)
  }
  get bestTrumpCard() {
    if (!this.hasTrumpCards) {
      return undefined
    }
    return this
      .filter(card => card instanceof TrumpCard)
      .reduce((best, card) => card.index > best.index ? card : best)
  }
  get bestSuitCard() {
    let suitCards = this.filter(card => card instanceof SuitCard)
    if (!suitCards.length) {
      return undefined
    }
    let [firstSuitCard] = suitCards
    return suitCards
      .filter(card => card instanceof SuitCard && firstSuitCard instanceof SuitCard && card.color === firstSuitCard.color)
      .reduce((best, card) => card.index > best.index ? card : best)
  }
  get bestCard() {
    if (this.followSuitCard instanceof TrumpCard) {
      return this.bestTrumpCard
    }

    if (this.followSuitCard instanceof SuitCard) {
      if (this.hasTrumpCards) {
        return this.bestTrumpCard
      }
      return this.bestSuitCard
    }
  }
}