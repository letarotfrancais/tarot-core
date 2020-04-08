import test from 'ava'

import TrumpCard from '../dist/trump-card'
import SuitCard from '../dist/suit-card'
import { SuitColor } from '../dist/types'
import Board from '../dist/board'
import Hand from '../dist/hand'

test('when there is no other card on the board', async t => {
  let trump2 = new TrumpCard(2, 1)

  t.true(trump2.isPlayable(new Board(), new Hand(trump2)),
    'trump 2 should be playable when the board is empty')
})

test('when the first card is trump card', async t => {
  let trump2 = new TrumpCard(2, 1)
  let trump3 = new TrumpCard(3, 1)
  let trump4 = new TrumpCard(4, 1)
  let suit1 = new SuitCard(1, 1, SuitColor.Heart, '1')

  t.true(trump3.isPlayable(new Board(trump2, suit1), new Hand(trump3, trump4)),
    'trump 3 should be playable since it is stronger')
  t.true(trump2.isPlayable(new Board(trump3), new Hand(trump2, suit1)),
    'trump 2 should be playable since it is the only trump card in the hand')
})

test('when the first card is suit card', async t => {
  let trump2 = new TrumpCard(2, 1)
  let trump3 = new TrumpCard(3, 1)
  let trump4 = new TrumpCard(4, 1)
  let suit1 = new SuitCard(1, 1, SuitColor.Heart, '1')
  let suit2 = new SuitCard(2, 1, SuitColor.Heart, '2')

  t.true(trump3.isPlayable(new Board(suit1), new Hand(trump3)),
    'trump 3 should be playable since it hand does not have the any card of the follow color')
  // t.true(trump2.isPlayable(new Board(trump3), new Hand(trump2, suit1)),
  //   'trump 2 should be playable since it is the only trump card in the hand')
})