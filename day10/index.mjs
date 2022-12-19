import { readFile, getFile } from '../lib/file.mjs'

const input = [
  'noop\n',
  ...readFile(getFile('input2.txt', import.meta.url))
    .split('\n')
    .map((v) => v.split(' '))
]

const part1 = () => {
  let x = 1
  let cycles = 0
  let limit = 221
  let line = 0
  let signalStrength = []

  while (cycles < limit) {
    const [op, value] = input[line]
    // console.log(op, value)
    line = (line + 1) % input.length
    signalStrength[cycles] = cycles * x
    cycles++
    if (op === 'addx') {
      signalStrength[cycles] = cycles * x
      x = x + Number(value)
      cycles++
    }
  }

  return (
    signalStrength[20] +
    signalStrength[60] +
    signalStrength[100] +
    signalStrength[140] +
    signalStrength[180] +
    signalStrength[220]
  )
}

const part2 = () => {
  let x = 1
  let cycles = 0
  let limit = 241
  let line = 0
  let signalStrength = []
  let crt = [[], [], [], [], [], []]
  let crtX = 0
  let crtY = 0
  let spritePositions = [0, 1, 2]

  const pixelOrEmpty = (x, spritePos) => {
    if (spritePos.includes(x)) {
      return '#'
    }
    return '.'
  }

  while (cycles < limit) {
    const [op, value] = input[line]
    if (crtX >= 40) {
      crtX = 0
      crtY = (crtY + 1) % 6
    }
    if (crtY >= 6) {
      crtY = 0
    }

    // console.log(cycles, crtX, crtY, spritePositions)
    crt[crtY][crtX - 1] = pixelOrEmpty(crtX, spritePositions)
    crtX = crtX + 1

    line = (line + 1) % input.length
    signalStrength[cycles] = cycles * x
    cycles++
    if (op === 'addx') {
      if (crtX >= 40) {
        crtX = 0
        crtY = (crtY + 1) % 6
      }
      if (crtY >= 6) {
        crtY = 0
      }

      // console.log(cycles, crtX, crtY, spritePositions)
      crt[crtY][crtX - 1] = pixelOrEmpty(crtX, spritePositions)
      crtX = crtX + 1

      signalStrength[cycles] = cycles * x
      x = x + Number(value)
      spritePositions = [x, x + 1, x + 2]
      cycles++
    }
  }

  return crt.map((a) => a.join(''))
}

console.log('day10', 'solutions:', part1(), part2())
