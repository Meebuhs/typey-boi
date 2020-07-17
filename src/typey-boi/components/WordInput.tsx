import * as React from 'react'
import { useState } from 'react'
import useKeyPress from '../hooks/useKeyPress'
import './WordInput.scss'
import { FutureWord } from './FutureWord'
import { CompletedWord } from './CompletedWord'
import { CurrentWord } from './CurrentWord'

const currentLine = 'This is placeholder text, it will be replaced later in development.'.split(
  ' '
)

export function WordInput(): React.ReactElement {
  const [lineInput, setLineIput] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)

  useKeyPress((key: string) => {
    if (key === 'Backspace') {
      if (lineInput.length === currentWordIndex) {
        // nothing in current word, go back one
        setCurrentWordIndex(lineInput.length - 1)
        setCurrentLetterIndex(lineInput[lineInput.length - 1].length)
      } else {
        // remove a character
        setCurrentLetterIndex(currentLetterIndex - 1)

        const newInput = [...lineInput]
        let [newWord] = lineInput.slice(-1)
        newWord = newWord.slice(0, -1)

        if (newWord.length) {
          // removed last character of word, remove it
          newInput[newInput.length - 1] = newWord
          setLineIput(newInput)
        } else {
          setLineIput(lineInput.slice(0, -1))
        }
      }
    } else if (key === ' ') {
      if (lineInput.length === currentWordIndex) {
        lineInput.push('')
      }

      setCurrentWordIndex(currentWordIndex + 1)
      setCurrentLetterIndex(0)
    } else {
      const newInput = [...lineInput]
      if (newInput.length > currentWordIndex) {
        let [newWord] = lineInput.slice(-1)
        newWord = newWord + key
        newInput[newInput.length - 1] = newWord
      } else {
        newInput.push([key])
      }
      setLineIput(newInput)
      setCurrentLetterIndex(currentLetterIndex + 1)
    }
  })

  return (
    <div className="container">
      <div className="current-line">
        {currentLine.map((word: string, wordIndex: number) => {
          if (wordIndex > currentWordIndex) {
            return <FutureWord word={word} wordIndex={wordIndex} />
          } else if (wordIndex == currentWordIndex) {
            return (
              <CurrentWord
                word={word}
                wordIndex={wordIndex}
                currentLetterIndex={currentLetterIndex}
                lineInput={lineInput}
              />
            )
          } else {
            return (
              <CompletedWord
                word={word}
                wordIndex={wordIndex}
                lineInput={lineInput}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
