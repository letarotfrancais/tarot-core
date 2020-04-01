import { CardType } from './types'

export default class Card {
  type: CardType
  index: number
  value: number
  name: string
  isOudler: boolean
  static transfer(from: Array<Card>, to: Array<Card>, amount: number = 1, start: number = 0) {
    to.push(...from.splice(start, amount))
  }
  static isEqual(a: Card, b: Card): boolean {
    return JSON.stringify(a) === JSON.stringify(b) // TODO use _.isEqual
  }
  static sort(card1: Card, card2: Card): boolean {
    return card1.sortCriteria < card2.sortCriteria
  }
  constructor(index: number, value: number, name: string) {
    this.index = index
    this.value = value
    this.name = name
    this.isOudler = false
  }
  get sortCriteria() {
    return `${this.type}`
  }
  isPlayable(board: Array<Card>, hand: Array<Card>) {
    if (!hand.includes(this)) {
      throw new CardError('provided hand does not contain this card')
    }
  }
}

export class CardError extends Error {
}