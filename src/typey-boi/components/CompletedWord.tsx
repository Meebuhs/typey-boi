import * as React from 'react'
import { CorrectLetter } from './CorrectLetter'
import { IncorrectLetter } from './IncorrectLetter'
import { ExtraLetter } from './ExtraLetter'
import { MissedLetter } from './MissedLetter'

interface IProps {
  word: string
  wordIndex: number
  lineInput: string[]
}

export function CompletedWord({ word, wordIndex, lineInput }: IProps): React.ReactElement {
  return (
    <div className="word" key={`word-${wordIndex}`}>
      {word
        .split('')
        .map((expectedLetter: string, letterIndex: number) => {
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

          const inputLength = lineInput[wordIndex].length
          if (inputLength > letterIndex && letterIndex === word.length - 1) {
            const extraContent = (
              <>
                {lineInput[wordIndex]
                  .split('')
                  .slice(letterIndex + 1, inputLength)
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
    </div>
  )
}
