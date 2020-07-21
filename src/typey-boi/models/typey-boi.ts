export interface IState {
  paragraphs: string[][]
  userInput: string[][]
  currentParagraphIndex: number
  currentWordIndex: number
  currentLetterIndex: number
}

export const initialState: IState = {
  paragraphs: [['Load', 'a', 'book', 'below.']],
  userInput: [['', '', '', '']],
  currentParagraphIndex: 0,
  currentWordIndex: 0,
  currentLetterIndex: 0,
}
