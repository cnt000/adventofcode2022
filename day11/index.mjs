import { readFile, getFile } from '../lib/file.mjs'

const input = [
  ...readFile(getFile('input1.txt', import.meta.url))
    .split('\n\n')
    .map((line) => line.split('\n'))
]

const part1 = () => {
  const instructions = input
    .map((monkey) => ({
      monkeyNr: Number(monkey[0].replace('Monkey ', '').replace(':', '')),
      items: monkey[1].replace('  Starting items: ', '').split(',').map(Number),
      operation: monkey[2].replace('  Operation: new = ', ''),
      test: Number(monkey[3].replace('  Test: divisible by ', '')),
      iftrueto: Number(monkey[4].replace('    If true: throw to monkey ', '')),
      iffalseto: Number(monkey[5].replace('    If false: throw to monkey ', ''))
    }))
    .map((monkey) => ({ ...monkey, times: monkey.items.length }))

  const round = () => {
    instructions.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const level = Math.floor(
          eval(monkey.operation.replace(/old/g, item)) / 3
        )
        if (level % monkey.test === 0) {
          instructions[monkey.iftrueto].items.push(level)
          instructions[monkey.iftrueto].times += 1
        } else {
          instructions[monkey.iffalseto].items.push(level)
          instructions[monkey.iffalseto].times += 1
        }
      })
      monkey.items = []
    })
  }

  for (let i = 0; i < 20; i++) {
    round()
  }
  return instructions
    .map((monkey) => monkey.times - monkey.items.length)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1)
}

const part2 = () => {
  const instructions = input
    .map((monkey) => ({
      monkeyNr: Number(monkey[0].replace('Monkey ', '').replace(':', '')),
      items: monkey[1].replace('  Starting items: ', '').split(',').map(Number),
      operation: monkey[2].replace('  Operation: new = ', ''),
      test: Number(monkey[3].replace('  Test: divisible by ', '')),
      iftrueto: Number(monkey[4].replace('    If true: throw to monkey ', '')),
      iffalseto: Number(monkey[5].replace('    If false: throw to monkey ', ''))
    }))
    .map((monkey) => ({ ...monkey, times: monkey.items.length }))

  const modulo = instructions.reduce((a, b) => a * b.test, 1)

  const round = () => {
    instructions.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const level = eval(monkey.operation.replace(/old/g, item))
        const newItem = level % modulo
        if (newItem % monkey.test === 0) {
          instructions[monkey.iftrueto].items.push(newItem)
          instructions[monkey.iftrueto].times += 1
        } else {
          instructions[monkey.iffalseto].items.push(newItem)
          instructions[monkey.iffalseto].times += 1
        }
      })
      monkey.items = []
    })
  }

  for (let i = 0; i < 10000; i++) {
    round()
  }

  return instructions
    .map((monkey) => monkey.times - monkey.items.length)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1)
}

console.log('day11', 'solutions:', part1(), part2())
