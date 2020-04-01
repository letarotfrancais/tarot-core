// @ts-ignore
import Card from './card'

export default class Player {
  id: string
  hand: Array<Card>
  tricks: Array<Card>
  static isEqual(a:Player, b:Player) {
    return a.id === b.id
  }
  constructor(id) {
    if (!id) {
      throw new PlayerError('player should have an id')
    }
    this.id = id
    this.hand = []
    this.tricks = []
  }
}

export class PlayerError extends Error {
}