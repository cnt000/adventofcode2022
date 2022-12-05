import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url))
  .split('\n')
  .map((val) => val.split(' '))

const value = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 }
const value2 = { X: 0, Y: 3, Z: 6 }

let result = 0
input.forEach((line) => {
  const [firstSymbol, secondSymbol] = line
  const playerAPoints = value[firstSymbol]
  const playerBPoints = value[secondSymbol]
  const points =
    (playerBPoints === 3 && playerAPoints === 2) ||
    (playerBPoints === 2 && playerAPoints === 1) ||
    (playerBPoints === 1 && playerAPoints === 3)
      ? 6
      : playerBPoints === playerAPoints
      ? 3
      : 0

  result += points + playerBPoints
})

const dict = {
  X: {
    // lose
    A: 'Z',
    X: 'C',
    C: 'Y',
    Z: 'B',
    B: 'X',
    Y: 'A'
  },
  Y: {
    // draw
    A: 'X',
    B: 'Y',
    C: 'Z',
    X: 'A',
    Y: 'B',
    Z: 'C'
  },
  Z: {
    // win
    A: 'Y',
    X: 'B',
    C: 'X',
    Z: 'A',
    B: 'Z',
    Y: 'C'
  }
}

let result2 = 0
input.forEach((line) => {
  const [firstSymbol, secondSymbol] = line
  const move = dict[secondSymbol][firstSymbol]
  const res = value[move]
  result2 += res + value2[secondSymbol]
})

console.log('day2', 'solutions:', result, result2)
