class Card {

}

class Player {
  hand: Card[]
}

class GameEvent {
  name: string
  payload: {}
}

class GameState {
  players: Player[]
  deck: Card[]
  dog: Card[]
  board: Card[]
  bids: { player: Player, contract: 'PASS'|'TAKE'|'GUARD' }[]
  get taker(): Player {
    return
  }
  get dealer(): Player {
    return
  }
}

class GameInstance {
  state: GameState
  eventsHistory: GameEvent[]
  constructor(players: number) {

  }
  send(name: string, payload: {}) {

  }
}

function loadGameInstance(gameState: GameState, eventsHistory: GameEvent[]) {
  let playersCount = gameState.players.length
  let gameInstance = new GameInstance(playersCount)
  gameInstance.state = gameState
  gameInstance.eventsHistory = eventsHistory
}