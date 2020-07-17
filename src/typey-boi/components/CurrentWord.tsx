import * as React from 'react'
import { CorrectLetter } from './CorrectLetter'
import { CurrentLetter } from './CurrentLetter'
import { IncorrectLetter } from './IncorrectLetter'
import { ExtraLetter } from './ExtraLetter'
import { FutureLetter } from './FutureLetter'

interface IProps {
  word: string
  wordIndex: number
  currentLetterIndex: number
  lineInput: string[]
}

export function CurrentWord({
  word,
  wordIndex,
  currentLetterIndex,
  lineInput,
}: IProps): React.ReactElement {
  return (
    <div className="word">
      {word.split('').map((expectedLetter: string, letterIndex: number) => {
        let typedLetter: string
        let letter: JSX.Element
        if (lineInput.length !== wordIndex) {
          typedLetter = lineInput[wordIndex][letterIndex]
          letter =
            expectedLetter === typedLetter ? (
              <CorrectLetter
                key={`w${wordIndex}-l${letterIndex}`}
                letter={typedLetter}
              />
            ) : (
              <IncorrectLetter
                key={`w${wordIndex}-l${letterIndex}`}
                letter={typedLetter}
              />
            )
        }

        if (letterIndex === currentLetterIndex) {
          return (
            <CurrentLetter
              key={`w${wordIndex}-l${letterIndex}`}
              letter={expectedLetter}
            />
          )
        } else if (
          lineInput.length == wordIndex ||
          letterIndex >= currentLetterIndex
        ) {
          return (
            <FutureLetter
              key={`w${wordIndex}-l${letterIndex}`}
              letter={expectedLetter}
            />
          )
        } else if (
          lineInput[wordIndex].length > letterIndex &&
          letterIndex === word.length - 1
        ) {
          const extraContent = (
            <>
              {lineInput[wordIndex]
                .split('')
                .slice(letterIndex + 1, lineInput[wordIndex].length)
                .map((extraLetter: string, index: number) => (
                  <ExtraLetter
                    key={`w${wordIndex}-el${index}`}
                    letter={extraLetter}
                  />
                ))}
            </>
          )
          return (
            <>
              {letter}
              {extraContent}
            </>
          )
        } else {
          return letter
        }
      })}
    </div>
  )
}
