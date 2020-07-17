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
        lineInput.push("")
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
                } else if (lineInput[wordIndex].length > charIndex && charIndex === word.length - 1) {
                  let status = ''
                  const letter = lineInput[wordIndex][charIndex]
                  if (letter === char) {
                    status = 'correct-letter'
                  } else {
                    status = 'incorrect-letter'
                  }
                  const extraContent = (
                    <>
                      {lineInput[wordIndex]
                        .split('')
                        .slice(charIndex + 1, lineInput[wordIndex].length)
                        .map((extraLetter: string, index: number) => (
                          <div
                            className={'extra-letter'}
                            key={`word-${wordIndex}-extra-${index}`}
                          >
                            {extraLetter}
                          </div>
                        ))}
                    </>
                  )
                  return (
                    <>
                      <div
                        className={`${status}`}
                        key={`letter-${wordIndex}-${charIndex}`}
                      >
                        {letter}
                      </div>
                      {extraContent}
                    </>
                  )
                } else {
                  // completed letters
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
                const inputLength = lineInput[wordIndex].length
                if (inputLength > charIndex && charIndex === word.length - 1) {
                  const extraContent = (
                    <>
                      {lineInput[wordIndex]
                        .split('')
                        .slice(charIndex + 1, inputLength)
                        .map((extraLetter: string, index: number) => (
                          <div
                            className={'extra-letter'}
                            key={`word-${wordIndex}-extra-${index}`}
                          >
                            {extraLetter}
                          </div>
                        ))}
                    </>
                  )
                  return (
                    <>
                      <div
                        className={`${status}`}
                        key={`letter-${wordIndex}-${charIndex}`}
                      >
                        {letter}
                      </div>
                      {extraContent}
                    </>
                  )
                } else if (
                  inputLength < word.length &&
                  charIndex === inputLength
                ) {
                  return word
                    .split('')
                    .slice(charIndex, word.length)
                    .map((missedLetter: string, index: number) => (
                      <div
                        className={'missed-letter'}
                        key={`word-${wordIndex}-missed-${index}`}
                      >
                        {missedLetter}
                      </div>
                    ))
                } else {
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
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
