import * as React from 'react'
import { FutureWord } from '../words/FutureWord'
import { CompletedWord } from '../words/CompletedWord'
import { CurrentWord } from '../words/CurrentWord'

interface IProps {
  line: string[]
  lineIndex: number
  currentWordIndex: number
  currentLetterIndex: number
  lineInput: string[]
}

export function CurrentLine({
  line,
  lineIndex,
  currentWordIndex,
  currentLetterIndex,
  lineInput,
}: IProps): React.ReactElement {
  return (
    <div className="current-line">
      {line.map((word: string, wordIndex: number) => {
        if (wordIndex > currentWordIndex) {
          return (
            <FutureWord
              key={`ln${lineIndex}-w${wordIndex}`}
              word={word}
              lineIndex={lineIndex}
              wordIndex={wordIndex}
            />
          )
        } else if (wordIndex == currentWordIndex) {
          return (
            <CurrentWord
              key={`ln${lineIndex}-w${wordIndex}`}
              word={word}
              wordIndex={wordIndex}
              lineIndex={lineIndex}
              currentLetterIndex={currentLetterIndex}
              lineInput={lineInput}
            />
          )
        } else {
          return (
            <CompletedWord
              key={`ln${lineIndex}-w${wordIndex}`}
              word={word}
              wordIndex={wordIndex}
              lineIndex={lineIndex}
              wordInput={lineInput[wordIndex]}
            />
          )
        }
      })}
    </div>
  )
}
