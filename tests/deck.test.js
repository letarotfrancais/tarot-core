import test from 'ava'
import Deck from '../dist/deck'

test('create deck', async t => {
  let deck = new Deck()

  t.is(deck.length, 78)
})