import * as React from 'react'
import { CompletedWord } from 'components/words/CompletedWord'

interface IProps {
  line: string[]
  lineIndex: number
  lineInput: string[]
}

export function CompletedLine({
  line,
  lineIndex,
  lineInput,
}: IProps): React.ReactElement {
  return (
    <div className="completed-line">
      {line.map((word: string, wordIndex: number) => {
        return (
          <CompletedWord
            key={`ln${lineIndex}-w${wordIndex}`}
            word={word}
            lineIndex={lineIndex}
            wordIndex={wordIndex}
            wordInput={lineInput[wordIndex]}
          />
        )
      })}
    </div>
  )
}
