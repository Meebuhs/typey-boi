import * as React from 'react'
import { CorrectLetter } from 'components/letters/CorrectLetter'
import { CurrentLetter } from 'components/letters/CurrentLetter'
import { IncorrectLetter } from 'components/letters/IncorrectLetter'
import { ExtraLetter } from 'components/letters/ExtraLetter'
import { FutureLetter } from 'components/letters/FutureLetter'

interface IProps {
  word: string
  wordIndex: number
  paragraphIndex: number
  currentLetterIndex: number
  wordInput: string
}

export function CurrentWord({
  word,
  paragraphIndex,
  wordIndex,
  currentLetterIndex,
  wordInput,
}: IProps): React.ReactElement {
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

        if (letterIndex === currentLetterIndex) {
          return (
            <CurrentLetter
              key={`p${paragraphIndex}-w${wordIndex}-l${letterIndex}`}
              letter={expectedLetter}
            />
          )
        } else if (letterIndex > currentLetterIndex) {
          return (
            <FutureLetter
              key={`p${paragraphIndex}-w${wordIndex}-l${letterIndex}`}
              letter={expectedLetter}
            />
          )
        } else if (
          wordInput.length - 1 > letterIndex &&
          letterIndex === word.length - 1
        ) {
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
        } else {
          return letter
        }
      })}
    </div>
  )
}
