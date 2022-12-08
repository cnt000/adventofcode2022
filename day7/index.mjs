import { readFile, getFile } from '../lib/file.mjs'

const visit = (line, path) => {
  let localPath = [...path]
  const [first, second, third] = line
  if (first === '$') {
    if (second === 'cd') {
      if (third === '..') {
        localPath.pop(third)
      } else {
        localPath.push(third)
      }
      cursor++
      return visit(input[cursor], localPath)
    }
    if (second === 'ls') {
      for (let i = cursor + 1; i < input.length - 1; i++) {
        fs.push({
          name: path.join('/') + '/' + input[i][1],
          size: input[i][0] === 'dir' ? 0 : Number(input[i][0]),
          type: input[i][0] === 'dir' ? 'dir' : 'file',
          children: []
        })
        fs = fs.map((res) =>
          res.name === path.join('/')
            ? {
                ...res,
                children: [...res.children, path.join('/') + '/' + input[i][1]]
              }
            : res
        )
        cursor++
        if (input[i + 1][0] === '$') {
          break
        }
      }
      cursor++
      return visit(input[cursor], localPath)
    }
  }
}

const calculateWeight = (dir) => {
  let weight = dir.size
  dir.children.forEach((c) => {
    const child = fs.find((f) => f.name === c)
    if (child.type === 'dir') {
      weight += calculateWeight(child)
    } else {
      weight += child.size
    }
  })
  return weight
}

const input = readFile(getFile('input1.txt', import.meta.url))
  .split('\n')
  .map((v) => v.split(' '))

let fs = [
  {
    name: '/',
    size: 0,
    type: 'dir',
    children: []
  }
]
let cursor = 0

visit(input[0], [])

const weights = fs
  .filter((f) => {
    return f.type === 'dir'
  })
  .map((dir) => ({
    name: dir.name,
    size: calculateWeight(dir)
  }))

const part1 = weights
  .filter((w) => w.size < 100000)
  .reduce((acc, curr) => {
    return acc + curr.size
  }, 0)

const wsorted = weights.map((w) => w.size).sort((a, b) => b - a)
const neededSpace = 30000000 - (70000000 - wsorted[0])

const part2 = wsorted
  .slice(1)
  .sort((a, b) => a - b)
  .filter((l) => l >= neededSpace)[0]

console.log('day7', 'solutions:', part1, part2)
