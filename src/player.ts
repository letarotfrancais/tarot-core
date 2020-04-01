// @ts-ignore
import lodash from 'lodash'
import Card from './card'

const { isEqual } = lodash

export default class Player {
  hand: Array<Card>
  tricks: Array<Card>
  static isEqual(a:Player, b:Player) {
    return isEqual(a, b)
  }
  constructor() {
    this.hand = []
    this.tricks = []
  }
}