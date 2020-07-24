import {
  Action,
  ADD_CHARACTER,
  REMOVE_CHARACTER,
  COMPLETE_WORD,
  COMPLETE_PARAGRAPH,
  SET_TEXT,
} from 'constants/types'
import { IState, initialState } from 'models/typey-boi'
import {
  FUTURE_PARAGRAPHS_TO_LOAD,
  COMPLETED_PARAGRAPHS_TO_KEEP,
} from 'constants/values'

export const reducer = (
  state: IState = initialState,
  action: Action
): IState => {
  const {
    text,
    completedParagraphs,
    currentParagraph,
    futureParagraphs,
    completedInputs,
    currentInput,
    currentParagraphIndex,
    currentWordIndex,
    currentLetterIndex,
  } = state
  switch (action.type) {
    case ADD_CHARACTER: {
      const newInput = [...currentInput]
      let [newWord] = newInput.slice(currentWordIndex, currentWordIndex + 1)
      newWord = newWord + action.payload.character

      newInput[currentWordIndex] = newWord

      return {
        ...state,
        currentInput: newInput,
        currentLetterIndex: currentLetterIndex + 1,
      }
    }
    case REMOVE_CHARACTER: {
      if (
        currentParagraphIndex !== 0 ||
        currentWordIndex !== 0 ||
        currentLetterIndex !== 0
      ) {
        if (currentWordIndex === 0 && currentLetterIndex === 0) {
          // at start of paragraph, ignore it
          return {
            ...state,
          }
        } else if (currentInput[currentWordIndex].length === 0) {
          // nothing in current word, go back one
          return {
            ...state,
            currentWordIndex: currentWordIndex - 1,
            currentLetterIndex: currentInput[currentWordIndex - 1].length,
          }
        } else {
          // remove a character
          const newInput = [...currentInput]
          let [newWord] = newInput.slice(currentWordIndex, currentWordIndex + 1)
          newWord = newWord.slice(0, -1)

          newInput[currentWordIndex] = newWord

          return {
            ...state,
            currentInput: newInput,
            currentLetterIndex: currentLetterIndex - 1,
          }
        }
      } else {
        return state
      }
    }
    case COMPLETE_WORD: {
      if (currentParagraph.length - 1 === currentWordIndex) {
        // at end of paragraph, ignore it
        return {
          ...state,
        }
      } else {
        return {
          ...state,
          currentWordIndex: currentWordIndex + 1,
          currentLetterIndex: 0,
        }
      }
    }
    case COMPLETE_PARAGRAPH: {
      const newCompletedParagraphs = [...completedParagraphs]
      if (newCompletedParagraphs.length === COMPLETED_PARAGRAPHS_TO_KEEP) {
        newCompletedParagraphs.shift()
      }
      newCompletedParagraphs.push(currentParagraph)

      const newFutureParagraphs = [...futureParagraphs]
      const newCurrentParagraph = newFutureParagraphs.shift()

      newFutureParagraphs.push(
        text[currentParagraphIndex + FUTURE_PARAGRAPHS_TO_LOAD + 1].split(' ')
      )

      const newCompletedInputs = [...completedInputs]
      if (newCompletedInputs.length === COMPLETED_PARAGRAPHS_TO_KEEP) {
        newCompletedInputs.shift()
      }
      newCompletedInputs.push(currentInput)

      const newCurrentInput = new Array(newCurrentParagraph.length).fill('')

      return {
        ...state,
        completedParagraphs: newCompletedParagraphs,
        currentParagraph: newCurrentParagraph,
        futureParagraphs: newFutureParagraphs,
        currentParagraphIndex: currentParagraphIndex + 1,
        completedInputs: newCompletedInputs,
        currentInput: newCurrentInput,
        currentWordIndex: 0,
        currentLetterIndex: 0,
      }
    }
    case SET_TEXT: {
      const newText = action.payload.text
        .replace(/\r/g, '')
        .split(/\n/)
        .filter((paragraph) => paragraph !== '')

      const newCurrentParagraph = newText[0].split(' ')

      const newFutureParagraphs = newText
        .slice(1, FUTURE_PARAGRAPHS_TO_LOAD + 1)
        .map((paragraph) => paragraph.split(' '))

      const newCurrentInput = new Array(newCurrentParagraph.length).fill('')

      return {
        ...state,
        text: newText,
        completedParagraphs: [],
        currentParagraph: newCurrentParagraph,
        futureParagraphs: newFutureParagraphs,
        completedInputs: [],
        currentInput: newCurrentInput,
        currentParagraphIndex: 0,
        currentWordIndex: 0,
        currentLetterIndex: 0,
      }
    }
    default:
      return state
  }
}
