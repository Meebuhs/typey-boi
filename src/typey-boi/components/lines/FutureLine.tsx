import * as React from 'react'
import { FutureWord } from 'words/FutureWord'

interface IProps {
  line: string[]
  lineIndex: number
}

export function FutureLine({ line, lineIndex }: IProps): React.ReactElement {
  return (
    <div className="future-line">
      {line.map((word: string, wordIndex: number) => {
        return (
          <FutureWord
            key={`ln${lineIndex}-w${wordIndex}`}
            lineIndex={lineIndex}
            word={word}
            wordIndex={wordIndex}
          />
        )
      })}
    </div>
  )
}
