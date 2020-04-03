import test from 'ava'
import Game from '../dist/game.js'
import Player from '../dist/player'
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
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [new Player('A'), new Player('B'), new Player('C')]
  }
  let game = new Game(config)

  // game shuffle method stub
  game.shuffle = () => {}

  // START: SHUFFLE & DEAL
  game.start()

  // BID
  let playersContracts = [Contract.Pass, Contract.Take, Contract.Guard]
  game.state.players.forEach((player, index) => {
    game.exec('bid', { player, contract: playersContracts[index] })
    let bid = game.state.bids[index]
    t.is(bid.player.id, player.id)
    t.is(bid.contract, playersContracts[index])
  })

  t.true(Player.isEqual(game.state.taker, game.state.players.findId('C')), 'taker should be player C')
  t.is(game.state.players.findId('C').hand.length, 30, 'player C should still have 30 cards in their hand before discarding')
  t.true(Player.isEqual(game.state.currentPlayer, game.state.players.findId('A')), 'current player should be reset to player A')
  t.is(game.actionsSequence[0], Action.Discard, 'next action should be discard')

  // DISCARD
  let { taker } = game.state
  let cardsToDiscard = taker.hand.slice(0, 6)

  game.exec('discard', { player: taker, cards: cardsToDiscard })
  t.is(taker.hand.length, 24, 'player C should still have 24 cards in their hand after discarding')
  t.is(taker.tricks.length, 6, 'player C should have 6 cards in their tricks')
  t.is(game.actionsSequence[0], Action.Play, 'next action should be play')

  // PLAY
  console.log('\n -------- TRICK ----------');
  game.state.players.forEach(player => {
    let [card] = player.hand.getPlayableCards(game.state.board)
    console.log(`Player ${player.id} played`, card);
    game.exec('play', { player, card })
  })

  t.is(game.state.players.findId('C').tricks.length, 6 + 3, 'player C should have won the trick')

  while (game.state.currentPlayer.hand.length) {
    console.log('\n-------- TRICK ----------');
    game.state.players.forEach(player => {
      let [card] = player.hand.getPlayableCards(game.state.board)
      console.log(`Player ${player.id} played`, card);
      game.exec('play', { player, card })
    })
  }

  t.pass()

  game.actionsHistory.forEach(actionHistory => console.log(actionHistory));

})

// TODO test history