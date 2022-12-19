import { readFile, getFile } from '../lib/file.mjs'

const input = [
  ...readFile(getFile('input.txt', import.meta.url))
    .split('\n\n')
    .map((line) => line.split('\n'))
]

const instructions = input
  .map((monkey) => ({
    monkeyNr: Number(monkey[0].replace('Monkey ', '').replace(':', '')),
    items: monkey[1].replace('  Starting items: ', '').split(',').map(Number),
    operation: monkey[2].replace('  Operation: new = ', '').split(' '),
    test: Number(monkey[3].replace('  Test: divisible by ', '')),
    iftrueto: Number(monkey[4].replace('    If true: throw to monkey ', '')),
    iffalseto: Number(monkey[5].replace('    If false: throw to monkey ', ''))
  }))
  .map((monkey) => ({ ...monkey, times: 0 }))

console.log(instructions)
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < instructions.length; j++) {
    instructions[j].times += instructions[j].items.length
    while (instructions[j].items.length > 0) {
      const [first, op, second] = instructions[j].operation
      let level
      if (first === 'old' && second === 'old') {
        if (op === '+') {
          level = instructions[j].items[0] + instructions[j].items[0]
        }
        if (op === '*') {
          level = instructions[j].items[0] * instructions[j].items[0]
        }
      } else if (first === 'old') {
        if (op === '+') {
          level = instructions[j].items[0] + Number(second)
        }
        if (op === '*') {
          level = instructions[j].items[0] * Number(second)
        }
      }
      if (level % instructions[j].test === 0) {
        instructions[instructions[j].iftrueto].items.push(level)
      } else {
        instructions[instructions[j].iffalseto].items.push(level)
      }
      instructions[j].items.shift()
    }
    // instructions[j].items = []
  }
}

console.log(instructions)
console.log(
  'part2: ',
  instructions.map((monkey) => monkey.times).sort((a, b) => b - a)
  // .slice(0, 2)
  // .reduce((acc, curr) => acc * curr)
)
