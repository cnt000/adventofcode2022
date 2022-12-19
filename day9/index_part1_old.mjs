import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input2.txt', import.meta.url))
  .split('\n')
  .map((v) => v.split(' '))

let T = [0, 0]
let H = [0, 0]

const Tpositions = [[0, 0]]

const directionMap = {
  R: [0, 1],
  L: [0, -1],
  U: [1, 0],
  D: [-1, 0]
}

const checkSameRowOrCol = (H, T) => {
  if (H[0] === T[0] || H[1] === T[1]) {
    return true
  }
  return false
}

const getDirection = (H, T) => {
  if (H[0] > T[0] && H[1] > T[1]) {
    return [1, 1] //'UR'
  }
  if (H[0] > T[0] && H[1] < T[1]) {
    return [+1, -1] //'UL'
  }
  if (H[0] < T[0] && H[1] < T[1]) {
    return [-1, -1] //'DL'
  }
  if (H[0] < T[0] && H[1] > T[1]) {
    return [-1, +1] //'DR'
  }
  return [0, 0]
}

const areTouching = (H, T) => {
  const angle1 = H[0] + 1 === T[0] && H[1] + 1 === T[1]
  const angle2 = H[0] + 1 === T[0] && H[1] - 1 === T[1]
  const angle3 = H[0] - 1 === T[0] && H[1] + 1 === T[1]
  const angle4 = H[0] - 1 === T[0] && H[1] - 1 === T[1]

  const n = H[0] + 1 === T[0] && H[1] === T[1]
  const s = H[0] === T[0] && H[1] + 1 === T[1]
  const w = H[0] - 1 === T[0] && H[1] === T[1]
  const e = H[0] === T[0] && H[1] - 1 === T[1]
  const same = H[0] === T[0] && H[1] === T[1]
  return angle1 || angle2 || angle3 || angle4 || n || s || w || e || same
}

let debug = [
  ['H', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.']
]
console.log('🚀 ~ file: index.mjs:80 ~ debug', debug)

input.forEach(([direction, n]) => {
  let previous = [0, 0]
  console.log('🚀', direction, n)
  for (let i = 0; i < n; i++) {
    const move = directionMap[direction]
    H = [H[0] + move[0], H[1] + move[1]]
    if (!areTouching(H, T)) {
      if (checkSameRowOrCol(H, T)) {
        T = [T[0] + previous[0], T[1] + previous[1]]
      } else {
        const dirToMove = getDirection(H, T)
        T = [T[0] + dirToMove[0], T[1] + dirToMove[1]]
      }
      Tpositions.push(JSON.stringify(T))
    }
    previous = move
    debug = debug.map((line) => line.map((cell) => '.'))
    try {
      debug[H[0]][H[1]] = 'H'
      debug[T[0]][T[1]] = 'T'
    } catch {}
  }
  console.log('🚀 ~ file: index.mjs:80 ~ debug', debug)
})
console.log(
  '🚀 ~ file: index.mjs:37 ~ Tpositions',
  new Set(Tpositions),
  new Set(Tpositions).size
)
