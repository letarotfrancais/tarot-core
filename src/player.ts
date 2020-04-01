import Card from './card'

export default class Player {
  hand: Array<Card>
  tricks: Array<Card>
  static isEqual(a:Player, b:Player) {
    return JSON.stringify(a) === JSON.stringify(b) // TODO use _.isEqual
  }
}