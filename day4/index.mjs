import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url)).trim()

const list = input
  .split('\n')
  .map((val) =>
    val.split(',').map((val) => val.split('-').map((n) => Number(n)))
  )

const numbersList = list.map((line) =>
  line.map((couple) => {
    let numbers = []
    for (let i = couple[0]; i <= couple[1]; i++) {
      numbers.push(i)
    }
    return numbers
  })
)

let result = 0
let result2 = 0
numbersList.forEach((list) => {
  const a = new Set(list[0])
  const b = new Set(list[1])
  const intersect = new Set([...a].filter((i) => b.has(i)))
  if (intersect.size === a.size || intersect.size === b.size) {
    result++
  }
  if (intersect.size > 0) {
    result2++
  }
})

console.log('day4', 'solutions:', result, result2)
