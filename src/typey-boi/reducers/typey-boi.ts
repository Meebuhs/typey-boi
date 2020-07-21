import {
  REMOVE_CHARACTER,
  COMPLETE_WORD,
  ADD_CHARACTER,
  Action,
  SET_TEXT,
} from 'constants/types'
import { IState, initialState } from 'models/typey-boi'

export const reducer = (
  state: IState = initialState,
  action: Action
): IState => {
  const {
    paragraphs,
    userInput,
    currentParagraphIndex,
    currentWordIndex,
    currentLetterIndex,
  } = state
  switch (action.type) {
    case REMOVE_CHARACTER: {
      if (
        currentParagraphIndex !== 0 ||
        currentWordIndex !== 0 ||
        currentLetterIndex !== 0
      ) {
        if (currentWordIndex === 0 && currentLetterIndex === 0) {
          // nothing in current line, go back one
          const newParagraphIndex = currentParagraphIndex - 1
          const newWordIndex = userInput[newParagraphIndex].length - 1
          const newLetterIndex = userInput[newParagraphIndex][newWordIndex].length

          return {
            ...state,
            currentParagraphIndex: newParagraphIndex,
            currentWordIndex: newWordIndex,
            currentLetterIndex: newLetterIndex,
          }
        } else if (
          userInput[currentParagraphIndex][currentWordIndex].length === 0
        ) {
          // nothing in current word, go back one
          return {
            ...state,
            currentWordIndex: currentWordIndex - 1,
            currentLetterIndex:
            userInput[currentParagraphIndex][currentWordIndex - 1].length,
          }
        } else {
          // remove a character
          const newInput = [...userInput]
          const newParagraph = [...newInput[currentParagraphIndex]]
          let [newWord] = newParagraph.slice(currentWordIndex, currentWordIndex + 1)
          newWord = newWord.slice(0, -1)

          newParagraph[currentWordIndex] = newWord
          newInput[currentParagraphIndex] = newParagraph

          return {
            ...state,
            userInput: newInput,
            currentLetterIndex: currentLetterIndex - 1,
          }
        }
      } else {
        return state
      }
    }
    case COMPLETE_WORD: {
      if (paragraphs[currentParagraphIndex].length - 1 === currentWordIndex) {
        // finished line
        return {
          ...state,
          currentParagraphIndex: currentParagraphIndex + 1,
          currentWordIndex: 0,
          currentLetterIndex: 0,
        }
      } else {
        return {
          ...state,
          currentWordIndex: currentWordIndex + 1,
          currentLetterIndex: 0,
        }
      }
    }
    case ADD_CHARACTER: {
      const newInput = [...userInput]
      const newParagraph = [...newInput[currentParagraphIndex]]
      let [newWord] = newParagraph.slice(currentWordIndex, currentWordIndex + 1)
      newWord = newWord + action.payload.character

      newParagraph[currentWordIndex] = newWord
      newInput[currentParagraphIndex] = newParagraph

      return {
        ...state,
        userInput: newInput,
        currentLetterIndex: currentLetterIndex + 1,
      }
    }
    case SET_TEXT: {
      const paragraphs = []
      console.log(action.payload.text.replace(/\r/g, "").split(/\n/))
      for (const paragraph of action.payload.text.replace(/\r/g, "").split(/\n/)) {
        if (paragraph !== '') {
        paragraphs.push(paragraph.split(' '))
        }
      }
      const inputs = []
      for (const paragraph of paragraphs) {
        inputs.push(new Array(paragraph.length).fill(''))
      }

      return {
        ...state,
        paragraphs: paragraphs,
        userInput: inputs,
      }
    }
    default:
      return state
  }
}
