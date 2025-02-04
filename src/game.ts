// @ts-ignore
import lodash from 'lodash'
import Card from './card'
import GameState from './game-state'
import Player from './player'
import { Action, IHistoryEntry, IGameConfig, Contract } from './types'
import { CONTRACTS_ORDER } from './constants'

const { shuffle, isEqual, cloneDeep } = lodash

export default class Game {

  state: GameState
  actionsSequence: Array<Action>
  actionsHistory: Array<IHistoryEntry>
  boardCardsPlayersMap: Array<{ card: Card, player: Player }> // TODO find a way to ditch it

  constructor(config: IGameConfig) {
    this.state = GameState.makeFromConfig(config)
    this.actionsSequence = [Action.Shuffle, Action.Deal]
    this.actionsHistory = []
    this.boardCardsPlayersMap = []
  }

  exec(action: Action, payload?: {}) {
    if (this.actionsSequence[0] === action) {
      // TODO replace incoming resources with those in this game instance
      this[action].call(this, payload) // apply action
      this.actionsSequence.splice(0, 1) // remove sequence action entry
      this.actionsHistory.push({ action, payload: cloneDeep(payload), state: GameState.copy(this.state) })
    } else {
      throw new GameError(`game is expecting action "${this.actionsSequence[0]}" to be performed, not ${action}`)
    }
  }
  start() {
    // @ts-ignore Start is not a real Action ; its only use is to push a history action to record initial state
    this.actionsHistory.push({ action: 'start', payload: undefined, state: GameState.copy(this.state) })
    this.exec(Action.Shuffle)
    this.exec(Action.Deal) // we need to deal to hands before we can compute the number of Play actions
    this.actionsSequence.push(
      ...Array(this.state.players.length).fill(Action.Bid),
      Action.Discard,
      ...Array(this.state.players.length * this.state.players.first.hand.length).fill(Action.Play)
    )
  }

  // ACTIONS
  shuffle() {
    this.state.deck = shuffle(this.state.deck) // TODO deck is not a Deck instance anymore, move its constructor a game method and remove Deck
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
    let { players, currentPlayer, nextPlayer, bids, dog } = this.state

    if (Player.isEqual(player, currentPlayer)) { // TODO turn this test into a decorator
      let highestBidContract = Math.max(...bids.map(({ contract }) => CONTRACTS_ORDER.indexOf(contract)))
      if (contract === Contract.Pass || CONTRACTS_ORDER.indexOf(contract) > highestBidContract) {
        bids.push({ player, contract })

        if (nextPlayer) { // TODO turn this into a decorator
          this.state.currentPlayer = nextPlayer
        } else {
          let { player : taker } = this.state.bids.reduce((prev, curr) => { // TODO do not include in above decorator
            if (!prev) return curr
            return CONTRACTS_ORDER.indexOf(prev.contract) > CONTRACTS_ORDER.indexOf(prev.contract) ? prev : curr
          }, undefined)

          this.state.taker = taker
          Card.transfer(dog, taker.hand, dog.length)
          this.state.currentPlayer = players.first
        }
      }
    } else {
      throw new GameError('this player is not expected to perform this action')
    }
  }
  discard({ player, cards }: { player: Player, cards: Array<Card> }) {
    let { state } = this
    if (!Player.isEqual(player, state.taker)) { // TODO turn this test into a decorator
      throw new GameError('this player is not expected to perform this action')
    }

    if (cards.length !== state.dogMaxSize) {
      throw new GameError('discard refused, check number of cards')
    }

    if (!cards.every(card => state.taker.hand.some(c => Card.isEqual(c, card)))) {
      throw new GameError('discard refused, check cards ownership')
    }

    cards.forEach(card => {
      let cardIndexInHand = state.taker.hand.findIndex(handCard => Card.isEqual(card, handCard))
      Card.transfer(state.taker.hand, state.taker.tricks, 1, cardIndexInHand)
    })
  }
  play({ player, card }: { player: Player, card: Card }) {
    let { currentPlayer, nextPlayer, board, players } = this.state

    if (!Player.isEqual(player, currentPlayer)) {
      throw new GameError('this player is not expected to perform this action')
    }

    let { hand } = currentPlayer
    card = hand.find(c => Card.isEqual(c, card))

    if (!card.isPlayable(board, hand)) {
      throw new GameError('this card is not playable')
    }

    let cardIndexInHand = hand.findIndex(handCard => Card.isEqual(card, handCard))
    Card.transfer(hand, board, 1, cardIndexInHand)
    this.boardCardsPlayersMap.push({ card, player: currentPlayer })

    if (nextPlayer) {  // TODO turn this into a decorator
      this.state.currentPlayer = nextPlayer
    } else {
      let { bestCard } = this.state.board // TODO do not include in decorator
      let { player: winner } = this.boardCardsPlayersMap.find(({ card }) => {
        return isEqual(card, bestCard)
      })
      console.log('TRICK WINNER IS', winner.id);

      Card.transfer(board, winner.tricks, board.length)
      this.boardCardsPlayersMap = []
      players.first = winner
      this.state.currentPlayer = players.first
    }
  }
}

export class GameError extends Error {
}