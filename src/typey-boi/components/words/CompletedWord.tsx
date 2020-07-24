import * as React from 'react'
import { CorrectLetter } from 'components/letters/CorrectLetter'
import { IncorrectLetter } from 'components/letters/IncorrectLetter'
import { ExtraLetter } from 'components/letters/ExtraLetter'
import { MissedLetter } from 'components/letters/MissedLetter'
import { ErrorIndicator } from 'components/ErrorIndicator'

interface IProps {
  word: string
  wordIndex: number
  paragraphIndex: number
  wordInput: string
}

export function CompletedWord({
  word,
  paragraphIndex,
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
              key={`p${paragraphIndex}-w${wordIndex}-l${letterIndex}`}
              letter={typedLetter}
            />
          ) : (
            <IncorrectLetter
              key={`p${paragraphIndex}-w${wordIndex}-l${letterIndex}`}
              letter={typedLetter}
            />
          )

        if (expectedLetter !== typedLetter) {
          error = true
        }

        const inputLength = wordInput.length
        if (inputLength - 1 > letterIndex && letterIndex === word.length - 1) {
          // last letter and there is extra input to display
          return (
            <React.Fragment key={`p${paragraphIndex}-w${wordIndex}-extras`}>
              {letter}
              {wordInput
                .split('')
                .slice(letterIndex + 1, wordInput.length)
                .map((extraLetter: string, extraIndex: number) => (
                  <ExtraLetter
                    key={`p${paragraphIndex}-w${wordIndex}-el${extraIndex}`}
                    letter={extraLetter}
                  />
                ))}
            </React.Fragment>
          )
        } else if (inputLength < word.length && letterIndex === inputLength) {
          // last typed letter but there are more letters in the word
          return word
            .split('')
            .slice(letterIndex, word.length)
            .map((missedLetter: string, missedIndex: number) => (
              <MissedLetter
                key={`p${paragraphIndex}-w${wordIndex}-ml${missedIndex}`}
                letter={missedLetter}
              />
            ))
        } else {
          return letter
        }
      })}
      {error ? (
        <ErrorIndicator key={`error-p${paragraphIndex}-w${wordIndex}`} />
      ) : null}
    </div>
  )
}
