import test from 'ava'

import Players from '../dist/players'
import Player from '../dist/player'

test('constructor', async t => {
  let players = new Players()
  t.truthy(players)
})

test('find player by id', async t => {
  let players = new Players(new Player('A'), new Player('B'), new Player('C'), new Player('D'))

  t.is(players.findId('A'), players[0])
})

test('get first player', async t => {
  let players = new Players(new Player('A'), new Player('B'), new Player('C'), new Player('D'))

  t.is(players.first, players.findId('A'))
})

test('get last player', async t => {
  let players = new Players(new Player('A'), new Player('B'), new Player('C'), new Player('D'))

  t.is(players.last, players.findId('D'))
})

test('set first player', async t => {
  let players = new Players(new Player('A'), new Player('B'), new Player('C'), new Player('D'))

  players.first = players.findId('C')
  t.is(players[0], players.findId('C'))
  t.is(players[1], players.findId('D'))
  t.is(players[2], players.findId('A'))
  t.is(players[3], players.findId('B'))

  players.first = players.findId('A')
  t.is(players[0], players.findId('A'))
  t.is(players[1], players.findId('B'))
  t.is(players[2], players.findId('C'))
  t.is(players[3], players.findId('D'))

  players.first = players.findId('D')
  t.is(players[0], players.findId('D'))
  t.is(players[1], players.findId('A'))
  t.is(players[2], players.findId('B'))
  t.is(players[3], players.findId('C'))
})