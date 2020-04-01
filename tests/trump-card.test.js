import test from 'ava'

import TrumpCard from '../dist/trump-card'

test('Trump card', async t => {
  let trump2 = new TrumpCard(2, 1)
  let trump3 = new TrumpCard(3, 1)
  let trump4 = new TrumpCard(4, 1)

  t.truthy(trump2.isPlayable([], [trump2]),
    'trump 2 should be playable when the board is empty')
  t.truthy(trump3.isPlayable([trump2], [trump3]),
    'trump 3 should be playable since it is stronger than the first card on the board')
  t.falsy(trump2.isPlayable([trump3], [trump2, trump4]),
    'trump 2 should not be playable since trump 4 is stronger than trump 3')
  t.truthy(trump2.isPlayable([trump3], [trump2]))
})