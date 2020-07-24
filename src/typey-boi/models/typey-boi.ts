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
 * @property {string[][]} userInput Contains the user input for the COMPLETED_PARAGRAPHS_TO_KEEP 
 * paragraphs completed by the user, if any, and the current paragraph. Each paragraph is stored
 * as an array of the words inputted by the user. The last element of this array will always be 
 * the current paragraph.
 * @property {number} currentParagraphIndex The index of the paragraph currently being typed
 * in the loaded text.
 * @property {number} currentWordIndex The index of the word currently being typed in the current
 * paragraph.
 * @property {number} currentLetterIndex The index of the letter currently being typed in the
 * current word.
 */
export interface IState {
  text: string[]
  completedParagraphs: string[][]
  currentParagraph: string[]
  futureParagraphs: string[][]
  userInput: string[][]
  currentParagraphIndex: number
  currentWordIndex: number
  currentLetterIndex: number
}

export const initialState: IState = {
  text: ['Load a book below.'],
  completedParagraphs: [],
  currentParagraph: ['Load', 'a', 'book', 'below.'],
  futureParagraphs: [],
  userInput: [['', '', '', '']],
  currentParagraphIndex: 0,
  currentWordIndex: 0,
  currentLetterIndex: 0,
}
