import test from 'ava'

import FoolCard from '../dist/fool-card'

test('playable status', async t => {
  let fool = new FoolCard(1, 1, '1')

  t.true(fool.isPlayable(null, [fool]), 'Fool card should always be playable')
})