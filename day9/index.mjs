import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input1.txt', import.meta.url))
  .split('\n')
  .map((v) => v.split(' '))

let knots = [
  [0, 0], // H
  [0, 0], // 1
  [0, 0], // 2
  [0, 0], // 3
  [0, 0], // 4
  [0, 0], // 5
  [0, 0], // 6
  [0, 0], // 7
  [0, 0], // 8
  [0, 0] // 9
]

const Tpositions = []
const ninePositions = []

const directionMap = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0]
}

const checkSameRow = (H, T) => {
  if (H[0] === T[0]) {
    return true
  }
  return false
}

const checkSameCol = (H, T) => {
  if (H[1] === T[1]) {
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

const isAdiacent = (H, T) => {
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

const empty = '.'
const head = 'H'
const esse = 's'
const val = (j) => j

const debugSize = 400
const gap = (debugSize / 2) % debugSize

let debug = new Array(debugSize)
  .fill(empty)
  .map((a) => new Array(debugSize).fill(empty))

for (let j = knots.length - 1; j >= 1; j--) {
  debug[knots[j][0] + gap][knots[j][1] + gap] = j
}
debug[knots[0][0] + gap][knots[0][1] + gap] = head

input.forEach(([direction, n]) => {
  console.log(direction, n)
  // console.log(debug.map((a) => a.join('')).join('\n'))
  // console.log(' ')
  for (let i = 0; i <= Number(n) - 1; i++) {
    const move = directionMap[direction]
    debug[knots[0][0] + gap][knots[0][1] + gap] = empty
    knots[0] = [knots[0][0] + move[0], knots[0][1] + move[1]]
    debug[knots[0][0] + gap][knots[0][1] + gap] = head
    // for dei knots[0] = H, knots[1] = 1, knots[2] = 2, ....
    for (let j = 1; j < knots.length; j++) {
      debug[0 + gap][0 + gap] = esse
      // console.log(debug.map((a) => a.join('')).join('\n'))
      // console.log(' ')
      if (!isAdiacent(knots[j - 1], knots[j])) {
        debug[knots[j][0] + gap][knots[j][1] + gap] = empty
        if (checkSameRow(knots[j - 1], knots[j])) {
          if (knots[j - 1][1] > knots[j][1]) {
            knots[j] = [knots[j][0], knots[j][1] + 1]
          } else {
            knots[j] = [knots[j][0], knots[j][1] - 1]
          }
        } else if (checkSameCol(knots[j - 1], knots[j])) {
          if (knots[j - 1][0] > knots[j][0]) {
            knots[j] = [knots[j][0] + 1, knots[j][1]]
          } else {
            knots[j] = [knots[j][0] - 1, knots[j][1]]
          }
        } else {
          const dirToMove = getDirection(knots[j - 1], knots[j])
          knots[j] = [knots[j][0] + dirToMove[0], knots[j][1] + dirToMove[1]]
        }
        debug[knots[j][0] + gap][knots[j][1] + gap] = val(j)
        Tpositions.push(knots[1])
        ninePositions.push(knots[9])
      }
    }
  }
})
const part1 = new Set(Tpositions.map((v) => JSON.stringify(v))).size + 1
const part2 = new Set(ninePositions.map((v) => JSON.stringify(v))).size

console.log('day9', 'solutions:', part1, part2)

// let debugLast = new Array(debugSize)
//   .fill(empty)
//   .map((a) => new Array(debugSize).fill(empty))

// for (let j = 0; j < Tpositions.length; j++) {
//   debugLast[Tpositions[j][0] + gap][Tpositions[j][1] + gap] = '#'
// }
// debugLast[0 + gap][0 + gap] = esse
// console.log(debugLast.map((a) => a.join('')).join('\n'))
// console.log(' ')
