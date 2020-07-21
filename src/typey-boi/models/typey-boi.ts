export interface IState {
  lines: string[][]
  lineInputs: string[][]
  currentLineIndex: number
  currentWordIndex: number
  currentLetterIndex: number
}

export const initialState: IState = {
  lines: [['Load', 'a', 'book', 'below.']],
  lineInputs: [['', '', '', '']],
  currentLineIndex: 0,
  currentWordIndex: 0,
  currentLetterIndex: 0,
}
