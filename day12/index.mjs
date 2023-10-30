import { readFile, getFile } from '../lib/file.mjs'

const isTestInput = process.argv[2] === '-test'
const inputFile = isTestInput ? 'input.txt' : 'input-big.txt'

const input = [
  ...readFile(getFile(inputFile, import.meta.url))
    .split('\n')
    .map((line) => line.split(''))
]

const findChar = (input, char) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const currVal = input[i][j]
      if (currVal === char) {
        return [i, j]
      }
    }
  }
}

let resultBFS = Infinity

const part1 = () => {
  const dict = {}
  const startCoord = findChar(input, 'S')
  const endCoord = findChar(input, 'E')
  const startPos = `${startCoord[0]}:${startCoord[1]}`
  const endPos = `${endCoord[0]}:${endCoord[1]}`
  input[startCoord[0]][startCoord[1]] = 'a'
  input[endCoord[0]][endCoord[1]] = 'z'
  for (let i = 0; i < input.length; i++) {
    let row = ''
    for (let j = 0; j < input[i].length; j++) {
      input[i][j] = input[i][j].charCodeAt()
      row += `${input[i][j]} `.padStart(4, ' ')
    }
    console.log(row)
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const pos = `${i}:${j}`
      const currVal = input[i][j]
      dict[pos] = []
      const l = input?.[i]?.[j - 1]
      const r = input?.[i]?.[j + 1]
      const d = input?.[i + 1]?.[j]
      const u = input?.[i - 1]?.[j]
      if (l && currVal + 1 >= l) {
        dict[pos].push(`${[i]}:${[j - 1]}`)
      }
      if (r && currVal + 1 >= r) {
        dict[pos].push(`${[i]}:${[j + 1]}`)
      }
      if (u && currVal + 1 >= u) {
        dict[pos].push(`${[i - 1]}:${[j]}`)
      }
      if (d && currVal + 1 >= d) {
        dict[pos].push(`${[i + 1]}:${[j]}`)
      }
    }
  }
  const resultDFS = DFS(dict, startPos, [startPos], endPos)
  BFS(dict, startPos, [startPos], endPos)
  return [resultDFS, resultBFS]
}

const DFS = (graph, node, steps, end) => {
  if (node === end && steps.length < resultBFS) {
    resultBFS = steps.length - 1
  }
  for (let i = 0; i < graph[node].length; i++) {
    const next = graph[node][i]
    if (!steps.find((step) => step === next) && steps.length < resultBFS) {
      DFS(graph, next, [...steps, next], end)
    }
  }
}

const BFS = (graph, start, end) => {
  const queue = []
  queue.push([start, 0])

  const visited = []
  visited.push(start)

  while (queue.length) {
    const [node, distance] = queue.shift()
    console.log(graph[node])
    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i]
      if (!visited.find((x) => x === next)) {
        visited.push(next)
        queue.push([next, distance + 1])
      }
      if (next === end) {
        return distance + 1
      }
    }
  }
}
const [, resultDFS] = part1()
console.log('day12', 'solutions BFS:', resultBFS)
console.log('day12', 'solutions DFS:', resultDFS)
