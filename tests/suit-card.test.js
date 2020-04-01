import test from 'ava'

import TrumpCard from '../dist/trump-card'
import SuitCard from '../dist/suit-card'

test('Suit card', async t => {
  let club1 = new SuitCard('1', 1, 'CLUB', 1)
  let club2 = new SuitCard('2', 2, 'CLUB', 1)
  let heart1 = new SuitCard('1', 1, 'HEART', 1)
  let heart2 = new SuitCard('2', 2, 'HEART', 1)
  let trump4 = new TrumpCard(4, 1)

  t.truthy(club1.isPlayable([club2], [club1]),
    'club 1 should be playable since the first card on the board is the same color')
  t.falsy(heart2.isPlayable([club2, heart1], [club1, heart2]),
    'heart 2 should not be playable since the first card on the board is not the same color')

  t.truthy(heart2.isPlayable([club2], [heart2]),
    'heart 2 should be playable since the hand does not contain any card of the color of the first card on the board (pisser)')
    t.falsy(heart2.isPlayable([club2], [heart2, trump4]),
    'heart 2 should not be playable since the hand does contain an trump')
})