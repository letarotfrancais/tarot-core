// @ts-ignore
import Card from './card'
import Hand from './hand'

export default class Player {
  id: string
  hand: Hand
  tricks: Array<Card>
  static isEqual(a:Player, b:Player) {
    return a.id === b.id
  }
  constructor(id) {
    if (!id) {
      throw new PlayerError('player should have an id')
    }
    this.id = id
    this.hand = new Hand()
    this.tricks = []
  }
}

export class PlayerError extends Error {
}