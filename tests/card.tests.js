import test from 'ava'

import Card from '../dist/card'
import { CardError } from '../dist/card'

test('playable status', async t => {
  let card1 = new Card(1, 1, '1')

  t.falsy(card1.isPlayable(null, [card1]), 'default method does not return do anything')
  t.throws(() => card1.isPlayable(null, []), { instanceOf: CardError }, 'default method should throw an error when card is not in hand')
})

test('card tranfer', async t => {
  let from = [new Card(), new Card(), new Card()]
  let to = []

  Card.transfer(from, to)
  t.is(from.length, 2)
  t.is(to.length, 1)

  Card.transfer(from, to, 2)
  t.is(from.length, 0)
  t.is(to.length, 3)
})