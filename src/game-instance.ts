import GameState from './game-state'
import GameEvent from './game-event'

export default class GameInstance {
  state: GameState
  eventsHistory: GameEvent[]
  constructor(players: number) {

  }
  send(name: string, payload: {}) {

  }
}

// export function loadGameInstance(gameState: GameState, eventsHistory: GameEvent[]) {
//   let playersCount = gameState.players.length
//   let gameInstance = new GameInstance(playersCount)
//   gameInstance.state = gameState
//   gameInstance.eventsHistory = eventsHistory
// }