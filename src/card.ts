import { CardType } from './types'

export default class Card {
  id: string
  type: CardType // TODO delete and use class name instead
  index: number
  value: number
  name: string
  isOudler: boolean
  constructor(index: number, value: number, name: string) {
    this.index = index
    this.value = value
    this.name = name
    this.isOudler = false
  }
  get sortCriteria() { // TODO delete if not used
    return `${this.type}`
  }
  isPlayable(board: Array<Card>, hand: Array<Card>): boolean {
    if (!hand.includes(this)) {
      throw new CardError('provided hand does not contain this card')
    }

    return false
  }
  static transfer(from: Array<Card>, to: Array<Card>, amount: number = 1, start: number = 0) {
    to.push(...from.splice(start, amount))
  }
  static isEqual(a: Card, b: Card): boolean {
    return a.id === b.id
  }
  static sort(card1: Card, card2: Card): boolean { // TODO delete if not used
    return card1.sortCriteria < card2.sortCriteria
  }
}

export class CardError extends Error {
}