import * as React from 'react'
import { CorrectLetter } from 'components/letters/CorrectLetter'
import { CurrentLetter } from 'components/letters/CurrentLetter'
import { IncorrectLetter } from 'components/letters/IncorrectLetter'
import { ExtraLetter } from 'components/letters/ExtraLetter'
import { FutureLetter } from 'components/letters/FutureLetter'

interface IProps {
  word: string
  wordIndex: number
  lineIndex: number
  currentLetterIndex: number
  lineInput: string[]
}

export function CurrentWord({
  word,
  lineIndex,
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
                key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
                letter={typedLetter}
              />
            ) : (
              <IncorrectLetter
                key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
                letter={typedLetter}
              />
            )
        }

        if (letterIndex === currentLetterIndex) {
          return (
            <CurrentLetter
              key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
              letter={expectedLetter}
            />
          )
        } else if (
          lineInput.length == wordIndex ||
          letterIndex >= currentLetterIndex
        ) {
          return (
            <FutureLetter
              key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
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
                .map((extraLetter: string, extraIndex: number) => (
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
        } else {
          return letter
        }
      })}
    </div>
  )
}
