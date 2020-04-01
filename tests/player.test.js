import test from 'ava'

import Player from '../dist/player'

test('constructor', async t => {
  let player = new Player()

  t.truthy(player.hand instanceof Array, 'player should have hand')
  t.truthy(player.tricks instanceof Array, 'player should have a set of tricks')
})

test('equality ', async t => {
  let playerA = new Player()
  let playerB = new Player()

  t.truthy(Player.isEqual(playerA, playerB), 'players A and B should be equals')
})