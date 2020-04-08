import test from 'ava'

import TrumpCard from '../dist/trump-card'
import SuitCard from '../dist/suit-card'
import Hand from '../dist/hand'
import Board from '../dist/board'

test('Suit card', async t => {
  let club1 = new SuitCard('1', 1, 'CLUB', 1)
  let club2 = new SuitCard('2', 2, 'CLUB', 1)
  let heart1 = new SuitCard('1', 1, 'HEART', 1)
  let heart2 = new SuitCard('2', 2, 'HEART', 1)
  let trump4 = new TrumpCard(4, 1)

  t.true(club1.isPlayable(new Board(club2), new Hand(club1)),
    'club 1 should be playable since the first card on the board is the same color')
  t.false(heart2.isPlayable(new Board(club2, heart1), new Hand(club1, heart2)),
    'heart 2 should not be playable since the first card on the board is not the same color')

  t.true(heart2.isPlayable(new Board(club2), new Hand(heart2)),
    'heart 2 should be playable since the hand does not contain any card of the color of the first card on the board (pisser)')
    t.false(heart2.isPlayable(new Board(club2), new Hand(heart2, trump4)),
    'heart 2 should not be playable since the hand does contain an trump')
})