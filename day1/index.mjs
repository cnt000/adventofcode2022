import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url))
  .split('\n\n')
  .map((val) =>
    val
      .split('\n')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0)
  )

const sortedInput = input.sort((a, b) => a - b).reverse()
console.log(
  'day1',
  'solutions:',
  sortedInput[0],
  sortedInput[0] + sortedInput[1] + sortedInput[2]
)
