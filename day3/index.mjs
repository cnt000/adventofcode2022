import { readFile, getFile } from '../lib/file.mjs'

const input = readFile(getFile('input.txt', import.meta.url)).split('\n')

const lowercase = '-abcdefghijklmnopqrstuvwxyz'
const uppercase = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const firstPart = input.map((line) => {
  const part1 = line.slice(0, line.length / 2).split('')
  const part2 = line.slice(line.length / 2, line.length).split('')
  const res = part1.find((letter) => part2.includes(letter))
  return lowercase.indexOf(res) != -1
    ? lowercase.indexOf(res)
    : uppercase.indexOf(res) + 26
})
const result = firstPart.reduce((acc, curr) => acc + curr, 0)

const secondPart = input.map((line, i) => {
  const l1 = input[i]?.split('')
  const l2 = input[i + 1]?.split('')
  const l3 = input[i + 2]?.split('')
  const res = l1?.find((letter) => l2?.includes(letter) && l3?.includes(letter))
  return lowercase.indexOf(res) != -1
    ? lowercase.indexOf(res)
    : uppercase.indexOf(res) + 26
})
const result2 = secondPart.reduce(
  (acc, curr, i) => (i % 3 === 0 ? acc + curr : acc + 0),
  0
)

console.log('day3', 'solutions:', result, result2)
