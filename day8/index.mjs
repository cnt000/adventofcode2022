import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input1.txt', import.meta.url))
  .split('\n')
  .map((v) => v.split(''))

const results = []
const scores = []
const borders = input.length * 2 + (input[0].length - 2) * 2

for (let i = 1; i < input.length - 1; i++) {
  for (let j = 1; j < input[i].length - 1; j++) {
    const cell = input[i][j]
    let scoreRight = 0
    let foundRight = true
    for (let x = j + 1; x < input[i].length; x++) {
      scoreRight++
      if (input[i][x] >= cell) {
        foundRight = false
        break
      }
    }
    let scoreLeft = 0
    let foundLeft = true
    for (let x = j - 1; x >= 0; x--) {
      scoreLeft++
      if (input[i][x] >= cell) {
        foundLeft = false
        break
      }
    }
    let scoreBottom = 0
    let foundBottom = true
    for (let x = i + 1; x < input.length; x++) {
      scoreBottom++
      if (input[x][j] >= cell) {
        foundBottom = false
        break
      }
    }
    let scoreTop = 0
    let foundTop = true
    for (let x = i - 1; x >= 0; x--) {
      scoreTop++
      if (input[x][j] >= cell) {
        foundTop = false
        break
      }
    }
    if (foundRight || foundLeft || foundBottom || foundTop) {
      results.push([i, j])
    }
    scores.push(scoreRight * scoreLeft * scoreBottom * scoreTop)
  }
}

console.log('day8', 'solutions:', results.length + borders, Math.max(...scores))
