import test from 'ava'
import Game from '../dist/game.js'
import Player from '../dist/player'
import Deck from '../dist/deck'
import { Action, Contract } from '../dist/types.js'

test('constructor', async t => {
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [new Player('A'), new Player('B'), new Player('C')]
  }
  let game = new Game(config)

  t.is(game.state.players.length, 3, 'state should have 3 players')
  t.is(game.actionsSequence[0], Action.Shuffle, 'first action should be deal')
})

test('shuffle', async t => {
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [new Player('A'), new Player('B'), new Player('C')]
  }
  let game = new Game(config)

  game.exec('shuffle')

  t.is(game.state.deck.length, 78, 'deck should still contain 78 cards')
  t.is(game.actionsSequence[0], Action.Deal, 'next action should be deal')
})

test('deal', async t => {
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [new Player('A'), new Player('B'), new Player('C')]
  }
  let game = new Game(config)

  game.exec('shuffle')
  game.exec('deal')

  t.is(game.state.deck.length, 0, 'game deck should be empty')
  t.true(game.state.players.every(player => player.hand.length === 24), 'each player should have 24 cards in their hands')
  t.is(game.state.dog.length, 6, 'dog should contain 6 cards')
  t.is(game.actionsSequence.length, 0, 'there should not be a next action')
})

test('start', async t => {
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [new Player('A'), new Player('B'), new Player('C')]
  }
  let game = new Game(config)

  game.start()

  t.true(game.actionsSequence.slice(0, 2).every(action => action === Action.Bid), 'first 3 actions should be bid')
  t.true(game.actionsSequence[3] === Action.Discard, 'action following bid should be discard')
  t.true(game.actionsSequence.slice(4).every(action => action === Action.Play), 'actions following discard should all be play')
})

test('full game', async t => {
  let players = [new Player('A'), new Player('B'), new Player('C')]
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players
  }
  let game = new Game(config)

  // START: SHUFFLE & DEAL
  game.start()

  // BID
  let bid0 = { player: players[0], contract: Contract.Pass }
  game.exec('bid', bid0)
  t.deepEqual(game.state.bids[0], bid0)

  let bid1 = { player: players[1], contract: Contract.Take }
  game.exec('bid', bid1)
  t.deepEqual(game.state.bids[1], bid1)

  let bid2 = { player: players[2], contract: Contract.Guard }
  game.exec('bid', bid2)
  t.deepEqual(game.state.bids[2], bid2)

  t.true(Player.isEqual(game.state.taker, game.state.players[2]), 'taker should be player C')
  t.is(game.state.players[2].hand.length, 24, 'player C should still have 24 cards in their hand before discarding')
  t.true(Player.isEqual(game.state.currentPlayer, game.state.players[0]), 'current player should be reset to player A')
  t.is(game.actionsSequence[0], Action.Discard, 'next action should be discard')

  // DISCARD
  let { taker } = game.state
  let cardsToDiscard = taker.hand.slice(0, 6)

  game.exec('discard', { player: taker, cards: cardsToDiscard })
  t.is(taker.hand.length, 18, 'player C should still have 24 cards in their hand after discarding')
  t.is(taker.tricks.length, 6, 'player C should have 6 cards in their tricks')
  t.is(game.actionsSequence[0], Action.Play, 'next action should be play')

  // PLAY
  game.state.players.forEach(player => {
    game.exec('play', { player, card: player.hand[0] })
  })
})

// TODO test history