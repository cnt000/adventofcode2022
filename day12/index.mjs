import { readFile, getFile } from '../lib/file.mjs'

const input = [
  ...readFile(getFile('input.txt', import.meta.url))
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

const pd = []

const part1 = () => {
  const dict = {}
  // cerca la S e parti da quella posizione
  const startCoord = findChar(input, 'S')
  const endCoord = findChar(input, 'E')
  const startPos = `${startCoord[0]}${startCoord[1]}`
  const endPos = `${endCoord[0]}${endCoord[1]}`
  // console.log('🚀 ~ file: index.mjs:25 ~ part1 ~ endCoord:', endPos)
  // sostiuiscila con la 'a'
  input[startCoord[0]][startCoord[1]] = 'a'
  // sostiuiscila con la '{' (value 123, la z ha valore 122)
  input[endCoord[0]][endCoord[1]] = '{'
  // per ogni posizione partendo da S
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const pos = `${i}${j}`
      dict[pos] = []
      const currVal = input[i][j]
      // guarda sinistra, destra, sopra, sotto
      const l = input?.[i]?.[j - 1]
      const r = input?.[i]?.[j + 1]
      const d = input?.[i + 1]?.[j]
      const u = input?.[i - 1]?.[j]
      // se uno di questi valori e' uguale o superiore di 1 del current value
      // aggiungi la posizione al dizionario { '00': ['10'] }
      // se incontri le E maiuscola marcala in qualche modo come END
      if (
        currVal.charCodeAt(0) === l?.charCodeAt(0) ||
        currVal.charCodeAt(0) + 1 === l?.charCodeAt(0)
      ) {
        dict[pos].push(`${i}${j - 1}`)
      }
      if (
        currVal.charCodeAt(0) === r?.charCodeAt(0) ||
        currVal.charCodeAt(0) + 1 === r?.charCodeAt(0)
      ) {
        dict[pos].push(`${i}${j + 1}`)
      }
      if (
        currVal.charCodeAt(0) === u?.charCodeAt(0) ||
        currVal.charCodeAt(0) + 1 === u?.charCodeAt(0)
      ) {
        dict[pos].push(`${i - 1}${j}`)
      }
      if (
        currVal.charCodeAt(0) === d?.charCodeAt(0) ||
        currVal.charCodeAt(0) + 1 === d?.charCodeAt(0)
      ) {
        dict[pos].push(`${i + 1}${j}`)
      }
    }
  }
  // stampa dizionario di vertici di adiacenza
  console.log(dict)
  // applica BFS o dijstra al dizionario
  // DFS(dict, startPos, [startPos], endPos)
  console.log(pd)
}
const visited = []

const DFS = (graph, node, steps, endPos) => {
  if (node === endPos) {
    // console.log('steps:', steps, steps.length)
    pd.push(steps)
    return steps
  }
  // esamina il nodo u e marcalo visitato -> se li scorro tutti non serve Object.keys
  // Object.keys(graph).forEach((pos) => {
  visited.push(node)
  // console.log('visited:', visited)
  //   // per ogni vettore adiacente a node => il valore di quella chiave che sto scorrendo con Object.keys
  graph[node].forEach((adj) => {
    // esamina l'arco node -> vettore adiacente
    let updatedSteps = steps
    if (!steps.includes(adj)) {
      updatedSteps.push(adj)
      // console.log(updatedSteps)
      // se il vettore adiacente non e' marcato visitato DFS(graph, nodo dove punta il vettore adiacente)
      // console.log(adj + ' -> ' + updatedSteps)
      if (!visited.includes(adj)) {
        DFS(graph, adj, updatedSteps, endPos)
      }
    }
  })
  console.log(' - - - - -')
  // })
}

// console.log(findS(input))
// console.log('day11', 'solutions:', part1())
part1()
