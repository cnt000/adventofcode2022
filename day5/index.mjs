import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url))
const [stacks, moves] = input.split('\n\n')
const stacksLines = stacks.split('\n')

const res = stacksLines[stacksLines.length - 1]
  .split('')
  .reduce((acc, curr, i) => {
    if (curr !== ' ') {
      acc[curr] = i
    }
    return acc
  }, {})

const stacksArray = stacksLines.reduce((acc, line) => {
  Object.keys(res).forEach((pos) => {
    if (line[res[pos]] !== ' ' && /[A-Z]/.test(line[res[pos]])) {
      if (acc?.[pos]) {
        acc[pos].push(line[res[pos]])
      } else {
        acc[pos] = [line[res[pos]]]
      }
    }
  })
  return acc
}, {})

moves.split('\n').forEach((line) => {
  const [, quantity, , from, , to] = line.split(' ')
  stacksArray[from].slice(0, quantity).forEach((item) => {
    stacksArray[to].splice(0, 0, item)
  })
  stacksArray[from].splice(0, quantity)
})

const result = Object.keys(stacksArray)
  .map((key) => stacksArray[key][0])
  .join('')

// part2
const stacksArray2 = stacksLines.reduce((acc, line) => {
  Object.keys(res).forEach((pos) => {
    if (line[res[pos]] !== ' ' && /[A-Z]/.test(line[res[pos]])) {
      if (acc?.[pos]) {
        acc[pos].push(line[res[pos]])
      } else {
        acc[pos] = [line[res[pos]]]
      }
    }
  })
  return acc
}, {})

moves.split('\n').forEach((line) => {
  const [, quantity, , from, , to] = line.split(' ').map(Number)
  stacksArray2[to] = [
    ...stacksArray2[from].slice(0, quantity),
    ...stacksArray2[to]
  ]
  stacksArray2[from].splice(0, quantity)
})

const result2 = Object.keys(stacksArray2)
  .map((key) => stacksArray2[key][0])
  .join('')

console.log('day5', 'solutions:', result, result2)
