import Card from './card'
import GameState from './game-state'
import { Action, HistoryEntry, Contract } from './types'
import Player from './player'

class Game {

  state: GameState
  sequence: Array<Action>
  history: Array<HistoryEntry>

  constructor(state: GameState) {
    this.sequence = [
      Action.Deal,
      ...Array(state.players.length).fill(Action.Bid),
      Action.Discard,
      ...Array(state.players[0].hand.length).fill(Action.Play)
    ]
  }

  deal() {
    let { deck, dog, players, dogMaxSize, dogDealSize, handDealSize } = this.state
    while (deck.length) {
      players.forEach(({ hand }) => Card.transfer(deck, hand, handDealSize))
      if (dog.length < dogMaxSize) {
        Card.transfer(deck, dog, dogDealSize)
      }
    }
  }
  bid({ player, contract }: { player: Player, contract: Contract }) {
    let { currentPlayer, nextPlayer, bids } = this.state
    if (Player.isEqual(player, currentPlayer)) { // TODO turn this test into a decorator
      let highestBidContract = Math.max(...bids.map(({ contract }) => contract))
      if (contract === Contract.Pass || contract > highestBidContract) {
        bids.push({ player, contract })
        currentPlayer = nextPlayer
      }
    }
  }
  discard({ player, cards }: { player: Player, cards: Array<Card> }) {
    let { taker, dogMaxSize } = this.state
    if (Player.isEqual(player, taker)) {
      if (
        cards.length === dogMaxSize
        && cards.every(card => player.hand.includes(card))) {
        let { hand, tricks } = player
        cards.forEach(card => {
          let cardIndexInHand = hand.findIndex(handCard => Card.isEqual(card, handCard))
          Card.transfer(hand, tricks, 1, cardIndexInHand)
        })
      }
    }
  }
  play({ player, card }, { player: Player, card: Card }) {
    let { currentPlayer, nextPlayer, board, players } = this.state
    if (Player.isEqual(player, currentPlayer)) {
      let { hand } = player
      if (
        player.hand.includes(card)
        && card.isPlayable(hand, board)
      ) {
        let cardIndexInHand = hand.findIndex(handCard => Card.isEqual(card, handCard))
        Card.transfer(hand, board, 1, cardIndexInHand)
      }
      if (nextPlayer) {
        currentPlayer = nextPlayer
      } else {
        let winner = currentPlayer // TODO chose actual winner
        Card.transfer(board, winner.tricks, board.length)
        currentPlayer == players[0]
      }
    }
  }
  exec(action: Action, payload: {}) {
    if (this.sequence[0] === action) {
      // TODO replace incoming resources with those in this game instance
      this[action].call(this, payload) // apply action
      this.sequence.splice(0, 1) // remove sequence entry
      let state = GameState.copy(this.state)
      this.history.push({ action, payload, state }) // add history entry
    }
  }
}