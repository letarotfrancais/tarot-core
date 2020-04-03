import Player from './player'

export default class Players extends Array<Player> {
  set first(player: Player) {
    this.splice(0, 0, ...this.splice(this.indexOf(player), this.length - this.indexOf(player)))
  }
  get first(): Player {
    return this[0]
  }
  get last(): Player {
    return this[this.length - 1]
  }
  findId(id: string): Player {
    return this.find(player => player.id === id)
  }
}