import * as React from 'react'
import { useState } from 'react'
import useKeyPress from '../hooks/useKeyPress'
import './WordInput.scss'

const currentLine = 'This is placeholder text, it will be replaced later in development.'.split(
  ' '
)

export function WordInput() {
  const [lineInput, setLineIput] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)

  useKeyPress((key) => {
    if (key === ' ') {
      const newWordIndex = currentWordIndex + 1
      setCurrentWordIndex(newWordIndex)
      setCurrentLetterIndex(0)
    } else {
      const newInput = [...lineInput]
      console.log(`${newInput.length}, ${currentWordIndex}`)
      if (newInput.length > currentWordIndex) {
        let [newWord] = lineInput.slice(-1)
        newWord = newWord + key
        newInput[newInput.length - 1] = newWord
      } else {
        newInput.push([key])
      }
      setLineIput(newInput)

      const newLetterIndex = currentLetterIndex + 1
      setCurrentLetterIndex(newLetterIndex)
    }
  })

  return (
    <div className="container">
      <div className="current-line">
        {currentLine.map((word, wordIndex) => (
          <div className="word" key={`word-${wordIndex}`}>
            {word.split('').map((char, charIndex) => {
              if (wordIndex > currentWordIndex) {
                // future words
                return (
                  <div
                    className={`future-letter`}
                    key={`letter-${wordIndex}-${charIndex}`}
                  >
                    {char}
                  </div>
                )
              } else if (wordIndex == currentWordIndex) {
                // current word
                let status = ''
                if (
                  lineInput.length == currentWordIndex ||
                  charIndex >= currentLetterIndex
                ) {
                  // future letters
                  return (
                    <div
                      className={`future-letter`}
                      key={`letter-${wordIndex}-${charIndex}`}
                    >
                      {char}
                    </div>
                  )
                } else {
                  // complete letters
                  const letter = lineInput[wordIndex][charIndex]
                  if (charIndex < currentLetterIndex) {
                    if (letter === char) {
                      status = 'correct-letter'
                    } else {
                      status = 'incorrect-letter'
                    }
                    return (
                      <div
                        className={`${status}`}
                        key={`letter-${wordIndex}-${charIndex}`}
                      >
                        {letter}
                      </div>
                    )
                  }
                }
              } else {
                // completed words
                let status = ''
                const letter = lineInput[wordIndex][charIndex]
                if (letter === char) {
                  status = 'correct-letter'
                } else {
                  status = 'incorrect-letter'
                }
                return (
                  <div
                    className={`${status}`}
                    key={`letter-${wordIndex}-${charIndex}`}
                  >
                    {letter}
                  </div>
                )
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
