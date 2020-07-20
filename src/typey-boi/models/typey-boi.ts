export interface IState {
  lines: string[][]
  lineInputs: string[][]
  currentLineIndex: number
  currentWordIndex: number
  currentLetterIndex: number
}

const text =
  'This is placeholder text, it will be replaced later in development. \
This is placeholder text, it will be replaced later in development. \
This is placeholder text, it will be replaced later in development. \
This is placeholder text, it will be replaced later in development.'

let characterCount = 0
const characterThreshold = 40
const lines = []
let line = []
for (const word of text.split(' ')) {
  if (characterCount + word.length < characterThreshold) {
    line.push(word)
    characterCount += word.length + 1
  } else {
    lines.push(line)
    line = [word]
    characterCount = 0
  }
}

export const initialState: IState = {
  lines: lines,
  lineInputs: [[]],
  currentLineIndex: 0,
  currentWordIndex: 0,
  currentLetterIndex: 0,
}
