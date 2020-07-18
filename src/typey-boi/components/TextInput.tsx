import * as React from 'react'
import { useState } from 'react'
import useKeyPress from '../hooks/useKeyPress'
import './TextInput.scss'
import { CurrentLine } from './lines/CurrentLine'
import { FutureLine } from './lines/FutureLine'
import { CompletedLine } from './lines/CompletedLine'

interface IProps {
  lines: string[][]
}

export function TextInput({ lines }: IProps): React.ReactElement {
  const [lineInputs, setLineInputs] = useState([[]])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)

  useKeyPress((key: string) => {
    if (key === 'Backspace') {
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
          setCurrentWordIndex(newWordIndex)
          setCurrentLineIndex(newLineIndex)
          setCurrentLetterIndex(lineInputs[newLineIndex][newWordIndex].length)

          const newInput = [...lineInputs]
          setLineInputs(newInput.slice(0, -1))
        } else if (lineInputs[currentLineIndex].length === currentWordIndex) {
          // nothing in current word, go back one
          const currentLine = lineInputs[currentLineIndex]
          setCurrentWordIndex(currentLine.length - 1)
          setCurrentLetterIndex(currentLine[currentLine.length - 1].length)
        } else {
          // remove a character
          setCurrentLetterIndex(currentLetterIndex - 1)

          const newLine = [...lineInputs[currentLineIndex]]
          let [newWord] = newLine.slice(-1)
          newWord = newWord.slice(0, -1)
          const newInput = [...lineInputs]

          if (newWord.length) {
            newLine[newLine.length - 1] = newWord
            newInput[currentLineIndex] = newLine
            setLineInputs(newInput)
          } else {
            // removed last character of word, remove it
            newInput[currentLineIndex] = newInput[currentLineIndex].slice(0, -1)
            setLineInputs(newInput)
          }
        }
      }
    } else if (key === ' ') {
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
        setLineInputs(newInput)
        setCurrentWordIndex(0)
        setCurrentLetterIndex(0)
        setCurrentLineIndex(currentLineIndex + 1)
      } else {
        setLineInputs(newInput)
        setCurrentWordIndex(currentWordIndex + 1)
        setCurrentLetterIndex(0)
      }
    } else {
      const newLine = [...lineInputs[currentLineIndex]]
      if (newLine.length > currentWordIndex) {
        let [newWord] = newLine.slice(-1)
        newWord = newWord + key
        newLine[newLine.length - 1] = newWord
      } else {
        newLine.push([key])
      }
      const newInput = [...lineInputs]
      newInput[currentLineIndex] = newLine
      setLineInputs(newInput)
      setCurrentLetterIndex(currentLetterIndex + 1)
    }
  })

  return (
    <div className="container">
      {lines.map((line: string[], lineIndex: number) => {
        if (lineIndex > currentLineIndex) {
          return (
            <FutureLine
              key={`ln${lineIndex}`}
              line={line}
              lineIndex={lineIndex}
            />
          )
        } else if (lineIndex == currentLineIndex) {
          return (
            <CurrentLine
              key={`ln${lineIndex}`}
              line={line}
              lineIndex={lineIndex}
              currentWordIndex={currentWordIndex}
              currentLetterIndex={currentLetterIndex}
              lineInput={lineInputs[lineIndex]}
            />
          )
        } else {
          return (
            <CompletedLine
              key={`ln${lineIndex}`}
              line={line}
              lineIndex={lineIndex}
              lineInput={lineInputs[lineIndex]}
            />
          )
        }
      })}
    </div>
  )
}
