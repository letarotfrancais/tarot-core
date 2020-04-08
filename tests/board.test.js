import test from 'ava'

import Board from '../dist/board'
import TrumpCard from '../dist/trump-card'
import SuitCard from '../dist/suit-card'

test('constructor', async t => {
  let board = new Board()
  t.truthy(board)
})

test('test if has trump card', async t => {
  let suitCard = new SuitCard(1, 1, 'HEART', '1')
  let trumpCard = new TrumpCard(1, 1)
  let board = new Board(suitCard, trumpCard)
  t.true(board.hasTrumpCards)
})

test('best trump card', async t => {
  let suitCard = new SuitCard(1, 1, 'HEART', '1')
  let trumpCard1 = new TrumpCard(1, 1)
  let trumpCard2 = new TrumpCard(2, 1)
  let board = new Board(suitCard,  trumpCard1,  trumpCard2)

  t.is(board.bestCard, trumpCard2)
})

test('best suit card', async t => {
  let suitCard1 = new SuitCard(1, 1, 'HEART', '1')
  let suitCard2 = new SuitCard(2, 1, 'HEART', '2')
  let trumpCard = new TrumpCard(1, 1)
  let board = new Board(suitCard1, suitCard2, trumpCard)
  t.is(board.bestSuitCard, suitCard2)
})

test('best card if there is a trump card', async t => {
  let suitCard = new SuitCard(1, 1, 'HEART', '1')
  let trumpCard = new TrumpCard(1, 1)
  let board = new Board(suitCard, trumpCard)
  t.is(board.bestCard, trumpCard)
})