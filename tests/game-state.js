import test from 'ava'
import GameState from '../dist/game-state.js'

test('test', async t => {
  let gameState = new GameState()
  t.truthy(gameState)
})
