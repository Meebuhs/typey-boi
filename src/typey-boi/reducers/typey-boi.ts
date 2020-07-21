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
    lines,
    lineInputs,
    currentLineIndex,
    currentWordIndex,
    currentLetterIndex,
  } = state
  switch (action.type) {
    case REMOVE_CHARACTER: {
      if (
        currentLineIndex !== 0 ||
        currentWordIndex !== 0 ||
        currentLetterIndex !== 0
      ) {
        if (currentWordIndex === 0 && currentLetterIndex === 0) {
          // nothing in current line, go back one
          const newLineIndex = currentLineIndex - 1
          const newWordIndex = lineInputs[newLineIndex].length - 1
          const newLetterIndex = lineInputs[newLineIndex][newWordIndex].length

          return {
            ...state,
            currentLineIndex: newLineIndex,
            currentWordIndex: newWordIndex,
            currentLetterIndex: newLetterIndex,
          }
        } else if (
          lineInputs[currentLineIndex][currentWordIndex].length === 0
        ) {
          // nothing in current word, go back one
          return {
            ...state,
            currentWordIndex: currentWordIndex - 1,
            currentLetterIndex:
              lineInputs[currentLineIndex][currentWordIndex - 1].length,
          }
        } else {
          // remove a character
          const newInput = [...lineInputs]
          const newLine = [...newInput[currentLineIndex]]
          let [newWord] = newLine.slice(currentWordIndex, currentWordIndex + 1)
          newWord = newWord.slice(0, -1)

          newLine[currentWordIndex] = newWord
          newInput[currentLineIndex] = newLine

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
      if (lines[currentLineIndex].length - 1 === currentWordIndex) {
        // finished line
        return {
          ...state,
          currentLineIndex: currentLineIndex + 1,
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
      const newInput = [...lineInputs]
      const newLine = [...newInput[currentLineIndex]]
      let [newWord] = newLine.slice(currentWordIndex, currentWordIndex + 1)
      newWord = newWord + action.payload.character

      newLine[currentWordIndex] = newWord
      newInput[currentLineIndex] = newLine

      return {
        ...state,
        lineInputs: newInput,
        currentLetterIndex: currentLetterIndex + 1,
      }
    }
    case SET_TEXT: {
      let characterCount = 0
      const characterThreshold = 40
      const lines = []
      let line = []
      for (const word of action.payload.text.split(' ')) {
        if (characterCount + word.length < characterThreshold) {
          line.push(word)
          characterCount += word.length + 1
        } else {
          lines.push(line)
          line = [word]
          characterCount = 0
        }
      }

      const inputs = []
      for (const line of lines) {
        inputs.push(new Array(line.length).fill(''))
      }

      return {
        ...state,
        lines: lines,
        lineInputs: inputs,
      }
    }
    default:
      return state
  }
}
