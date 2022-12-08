import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url)).split('')

const solution = (n) => {
  let start = 0
  let end = start + n
  let result = 0

  while (end < input.length) {
    let window = input.slice(start, end)
    const l = new Set(window).size === n
    if (l) {
      result = end
      break
    }
    start++
    end++
  }
  return result
}
console.log('day6', 'solutions:', solution(4), solution(14))
