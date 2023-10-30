import fs from 'node:fs'
import path from 'path'

export const readFile = (fileName) => {
  try {
    return fs.readFileSync(fileName, {
      encoding: 'utf8',
      flag: 'r'
    })
  } catch (err) {
    console.error(err)
  }
}

export function getFile(file, url) {
  const __dirname = path.dirname(new URL(url).pathname)
  const fileName = path.resolve(__dirname, file)
  return fileName
}

export const readDir = (dirName) => {
  try {
    return fs.readdirSync(dirName)
  } catch (err) {
    console.error(err)
  }
}

export const writeFile = (content, outputFile) => {
  try {
    const dirName = path.dirname(outputFile)
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true })
    }
    fs.writeFileSync(path.join(process.cwd(), outputFile), content, {
      flag: 'w+'
    })
  } catch (err) {
    console.error(err)
  }
}
