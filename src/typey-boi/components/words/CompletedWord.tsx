import * as React from 'react'
import { CorrectLetter } from 'components/letters/CorrectLetter'
import { IncorrectLetter } from 'components/letters/IncorrectLetter'
import { ExtraLetter } from 'components/letters/ExtraLetter'
import { MissedLetter } from 'components/letters/MissedLetter'
import { ErrorIndicator } from 'components/ErrorIndicator'

interface IProps {
  word: string
  wordIndex: number
  lineIndex: number
  wordInput: string
}

export function CompletedWord({
  word,
  lineIndex,
  wordIndex,
  wordInput,
}: IProps): React.ReactElement {
  let error = false

  return (
    <div className="word">
      {word.split('').map((expectedLetter: string, letterIndex: number) => {
        const typedLetter = wordInput[letterIndex]
        const letter =
          expectedLetter === typedLetter ? (
            <CorrectLetter
              key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
              letter={typedLetter}
            />
          ) : (
            <IncorrectLetter
              key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
              letter={typedLetter}
            />
          )

        if (expectedLetter !== typedLetter) {
          error = true
        }
        const inputLength = wordInput.length
        if (inputLength > letterIndex && letterIndex === word.length - 1) {
          const extraLetters = wordInput
            .split('')
            .slice(letterIndex + 1, inputLength)
          if (extraLetters.length) {
            error = true
          }
          const extraContent = (
            <>
              {extraLetters.map((extraLetter: string, extraIndex: number) => (
                <ExtraLetter
                  key={`ln${lineIndex}-w${wordIndex}-elt${extraIndex}`}
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
            .map((missedLetter: string, missedIndex: number) => (
              <MissedLetter
                key={`ln${lineIndex}-w${wordIndex}-mlt${missedIndex}`}
                letter={missedLetter}
              />
            ))
        } else {
          return letter
        }
      })}
      {error ? (
        <ErrorIndicator key={`error-ln${lineIndex}-w${wordIndex}`} />
      ) : null}
    </div>
  )
}
