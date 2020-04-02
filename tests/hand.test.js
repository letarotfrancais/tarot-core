import test from 'ava'

import Hand from '../dist/hand'
import Board from '../dist/board'
import TrumpCard from '../dist/trump-card'
import SuitCard from '../dist/suit-card'

test('constructor', async t => {
  let board = new Hand()
  t.truthy(board)
})

test('get playable cards', async t => {
  let suitCard1 = new SuitCard(1, 1, 'HEART', '1')
  let suitCard2 = new SuitCard(2, 3, 'HEART', '2')
  let trumpCard1 = new TrumpCard(1, 1)
  let trumpCard2 = new TrumpCard(2, 2)

  let hand = new Hand(trumpCard1, trumpCard2, suitCard2)
  let board = new Board(suitCard1)

  console.log(hand.getPlayableCards(board));

  t.is(hand.getPlayableCards(board).length, 1)
  t.is(hand.getPlayableCards(board)[0], suitCard2)
})