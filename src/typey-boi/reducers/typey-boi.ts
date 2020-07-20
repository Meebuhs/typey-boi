import {
  REMOVE_CHARACTER,
  COMPLETE_WORD,
  ADD_CHARACTER,
  Action,
} from 'constants/types'
import { IState, initialState } from 'models/typey-boi'

export const reducer = (
  state: IState = initialState,
  action: Action
): IState => {
  const {
    lines,
    lineInputs,
    currentLineIndex,
    currentWordIndex,
    currentLetterIndex,
  } = state
  switch (action.type) {
    case REMOVE_CHARACTER: {
      if (
        !(
          currentLineIndex === 0 &&
          currentWordIndex === 0 &&
          currentLetterIndex === 0
        )
      ) {
        if (lineInputs[currentLineIndex].length === 0) {
          // nothing in current line, go back one
          const newLineIndex = currentLineIndex - 1
          const newWordIndex = lineInputs[newLineIndex].length - 1
          const newLetterIndex = lineInputs[newLineIndex][newWordIndex].length
          const newInput = lineInputs.slice(0, -1)

          return {
            ...state,
            lineInputs: newInput,
            currentLineIndex: newLineIndex,
            currentWordIndex: newWordIndex,
            currentLetterIndex: newLetterIndex,
          }
        } else if (lineInputs[currentLineIndex].length === currentWordIndex) {
          // nothing in current word, go back one
          const currentLine = lineInputs[currentLineIndex]

          return {
            ...state,
            currentWordIndex: currentLine.length - 1,
            currentLetterIndex: currentLine[currentLine.length - 1].length,
          }
        } else {
          // remove a character
          const newLine = [...lineInputs[currentLineIndex]]
          let [newWord] = newLine.slice(-1)
          newWord = newWord.slice(0, -1)
          const newInput = [...lineInputs]

          if (newWord.length) {
            newLine[newLine.length - 1] = newWord
            newInput[currentLineIndex] = newLine
          } else {
            // removed last character of word, remove it
            newInput[currentLineIndex] = newInput[currentLineIndex].slice(0, -1)
          }

          return {
            ...state,
            lineInputs: newInput,
            currentLetterIndex: currentLetterIndex - 1,
          }
        }
      } else {
        return state
      }
    }
    case COMPLETE_WORD: {
      const newInput = [...lineInputs]

      if (lineInputs[currentLineIndex].length === currentWordIndex) {
        // catch empty words
        const newLine = [...lineInputs[currentLineIndex]]
        newLine.push('')
        newInput[currentLineIndex] = newLine
      }

      if (lines[currentLineIndex].length - 1 == currentWordIndex) {
        // finished line
        newInput.push([])

        return {
          ...state,
          lineInputs: newInput,
          currentLineIndex: currentLineIndex + 1,
          currentWordIndex: 0,
          currentLetterIndex: 0,
        }
      } else {
        return {
          ...state,
          lineInputs: newInput,
          currentWordIndex: currentWordIndex + 1,
          currentLetterIndex: 0,
        }
      }
    }
    case ADD_CHARACTER: {
      const newLine = [...lineInputs[currentLineIndex]]
      if (newLine.length > currentWordIndex) {
        let [newWord] = newLine.slice(-1)
        newWord = newWord + action.payload.character
        newLine[newLine.length - 1] = newWord
      } else {
        newLine.push(action.payload.character)
      }
      const newInput = [...lineInputs]
      newInput[currentLineIndex] = newLine

      return {
        ...state,
        lineInputs: newInput,
        currentLetterIndex: currentLetterIndex + 1,
      }
    }
    default:
      return state
  }
}
