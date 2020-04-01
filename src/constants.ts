import { Contract } from './types'

// HAND
export const HAND_DEALING_DEAL_SIZE = 3

// DOG
export const DOG_SIZE = 6
export const DOG_DEALING_DEAL_SIZE = 1

// TRUMP CARDS
export const TRUMP_OUDLERS = [1, 21]

// FOOL CARD
export const FOOL_INDEX = 1
export const FOOL_NAME = 'FOOL'

// SUIT CARDS
export const SUIT_CARD_FACE_FIRST_INDEX = 11
export const SUIT_CARD_NAMES = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN','JACK', 'KNIGHT', 'QUEEN', 'KING']


// VALUES
export const SUIT_CARD_FACE_VALUES = [1.5, 2.5, 3.5, 4.5]
export const OUDLER_VALUE = 4.5
export const BASE_VALUE = 0.5

// SCORE
export const SCORES_BY_OUDLER_COUNT = [56, 51, 41, 36]

// BIDS
export const CONTRACTS_ORDER = [Contract.Pass, Contract.Take, Contract.Guard]