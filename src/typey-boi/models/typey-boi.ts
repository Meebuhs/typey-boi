/**
 * @property {string[]} text The currently loaded text split into paragraphs.
 * @property {string[][]} completedParagraphs Contains the text for the paragraphs which have
 * been completed by the user. Each paragraph is stored as an array of individual words. The
 * length of this array will be less than or equal to COMPLETED_PARAGRAPHS_TO_KEEP
 * @property {string[]} currentParagraph Contains the text for the paragraph the user is
 * currently typing.
 * @property {string[][]} futureParagraphs Contains the text for the paragraphs which have
 * not yet been started by the user. Each paragraph is stored as an array of individual words.
 * The length of this array will be less than or equal to FUTURE_PARAGRAPHS_TO_LOAD.
 * @property {string[][]} completedInputs Contains the user input for the COMPLETED_PARAGRAPHS_TO_KEEP
 * paragraphs completed by the user, if any. Each paragraph is stored as an array of the words
 * inputted by the user.
 * @property {string[]} currentInput Contains the user input for the current paragraph stored as
 * an array of the words inputted by the user.
 * @property {number} currentParagraphIndex The index of the paragraph currently being typed
 * in the loaded text.
 * @property {number} currentWordIndex The index of the word currently being typed in the current
 * paragraph.
 * @property {number} currentLetterIndex The index of the letter currently being typed in the
 * current word.
 * @property {IStoredStats[]} pastStats The stored wpm and accuracy statistics for past sessions.
 */
export interface IState {
  text: string[]
  completedParagraphs: string[][]
  currentParagraph: string[]
  futureParagraphs: string[][]
  completedInputs: string[][]
  currentInput: string[]
  currentParagraphIndex: number
  currentWordIndex: number
  currentLetterIndex: number
  pastStats: IStoredStats[]
}

export const initialState: IState = {
  text: ['Load a book below.'],
  completedParagraphs: [],
  currentParagraph: ['Load', 'a', 'book', 'below.'],
  futureParagraphs: [],
  completedInputs: [],
  currentInput: ['', '', '', ''],
  currentParagraphIndex: 0,
  currentWordIndex: 0,
  currentLetterIndex: 0,
  pastStats: [],
}

export interface IStoredStats {
  date: number
  sessionDuration: number
  wpm: number
  accuracy: number
}
