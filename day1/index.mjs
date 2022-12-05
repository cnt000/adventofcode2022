import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url))
  .split('\n\n')
  .map((val) =>
    val
      .split('\n')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0)
  )

const firstMax = Math.max(...input)
const excludeFirst = input.filter((val) => val !== firstMax)
const secondMax = Math.max(...excludeFirst)
const excludeSecond = excludeFirst.filter((val) => val !== secondMax)
const thirdMax = Math.max(...excludeSecond)
console.log('day1', 'solutions:', firstMax, firstMax + secondMax + thirdMax)
