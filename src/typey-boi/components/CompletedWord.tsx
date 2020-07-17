import * as React from 'react'
import { CorrectLetter } from './CorrectLetter'
import { IncorrectLetter } from './IncorrectLetter'
import { ExtraLetter } from './ExtraLetter'
import { MissedLetter } from './MissedLetter'
import { ErrorIndicator } from './ErrorIndicator'

interface IProps {
  word: string
  wordIndex: number
  lineInput: string[]
}

export function CompletedWord({
  word,
  wordIndex,
  lineInput,
}: IProps): React.ReactElement {
  let error = false

  return (
    <div className="word">
      {word.split('').map((expectedLetter: string, letterIndex: number) => {
        const typedLetter = lineInput[wordIndex][letterIndex]
        const letter =
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

        if (expectedLetter !== typedLetter) {
          error = true
        }
        const inputLength = lineInput[wordIndex].length
        if (inputLength > letterIndex && letterIndex === word.length - 1) {
          const extraLetters = lineInput[wordIndex]
            .split('')
            .slice(letterIndex + 1, inputLength)
          if (extraLetters.length) {
            error = true
          }
          const extraContent = (
            <>
              {extraLetters.map((extraLetter: string, index: number) => (
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
        } else if (inputLength < word.length && letterIndex === inputLength) {
          return word
            .split('')
            .slice(letterIndex, word.length)
            .map((missedLetter: string) => (
              <MissedLetter
                key={`w${wordIndex}-l${letterIndex}`}
                letter={missedLetter}
              />
            ))
        } else {
          return letter
        }
      })}
      {error ? <ErrorIndicator key={`error-w${wordIndex}`} /> : null}
    </div>
  )
}
