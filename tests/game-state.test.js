import test from 'ava'
import GameState from '../dist/game-state.js'
import Deck from '../dist/deck.js'
import Player from '../dist/player.js'
import { Contract } from '../dist/types.js'
import Board from '../dist/board.js'

test('contructor', async t => {
  let gameStateData = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [new Player('A')],
    deck: new Deck(),
    dog: [],
    board: [],
    bids: []
  }
  let gameState = new GameState(gameStateData)

  t.is(gameState.dogDealSize, 1)
  t.is(gameState.dogMaxSize, 6)
  t.is(gameState.handDealSize, 3)
  t.truthy(gameState.players instanceof Array)
  t.truthy(gameState.deck instanceof Deck)
  t.truthy(gameState.dog instanceof Array)
  t.truthy(gameState.board instanceof Board)
  t.truthy(gameState.bids instanceof Array)

  t.is(gameState.currentPlayer, gameState.players[0], 'current player should be first players from players list')
})

test('next player', async t => {
  let playerA = new Player('A')
  let playerB = new Player('B')
  let gameStateData = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [playerA, playerB],
    deck: new Deck(),
    dog: [],
    board: [],
    bids: []
  }
  let gameState = new GameState(gameStateData)

  t.true(gameState.nextPlayer instanceof Player)
  t.deepEqual(gameState.nextPlayer, playerB, 'next player should be player B')
})

test('taker', async t => {
  let playerA = new Player('A')
  let playerB = new Player('B')
  let gameStateData = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [],
    deck: new Deck(),
    dog: [],
    board: [],
    bids: [
      {
        player: playerA,
        contract: Contract.Pass
      },
      {
        player: playerB,
        contract: Contract.Take
      }
    ]
  }
  let gameState = new GameState(gameStateData)

  t.deepEqual(gameState.taker, playerB, 'taker should be player B')
})

test('copy', async t => {
  let gameStateA = new GameState({ players: [] })
  let gameStateB = GameState.copy(gameStateA)

  t.false(gameStateA === gameStateB, 'game states A and B should not be the same object')
  t.false(gameStateA.players === gameStateB.players, 'game states  A and B properties should not be the same objects')
  t.deepEqual(gameStateA, gameStateB, 'game states A and B should be (deeply) equals')
})

test('make from config', async t => {
  let config = {
    dogDealSize: 1,
    dogMaxSize: 6,
    handDealSize: 3,
    players: [],
  }
  let gameState = GameState.makeFromConfig(config)

  t.true(gameState.deck instanceof Deck, 'game state should have deck')
  t.true(gameState.dog instanceof Array, 'game state should have dog')
  t.true(gameState.board instanceof Array, 'game state should have board')
  t.true(gameState.bids instanceof Array, 'game state should have bids')
})