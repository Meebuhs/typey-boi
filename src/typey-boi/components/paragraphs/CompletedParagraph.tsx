import * as React from 'react'
import { CompletedWord } from 'components/words/CompletedWord'

interface IProps {
  paragraph: string[]
  paragraphIndex: number
  paragraphInput: string[]
}

export function CompletedParagraph({
  paragraph,
  paragraphIndex,
  paragraphInput,
}: IProps): React.ReactElement {
  return (
    <div className="completed-paragraph">
      {paragraph.map((word: string, wordIndex: number) => {
        return (
          <CompletedWord
            key={`p${paragraphIndex}-w${wordIndex}`}
            word={word}
            paragraphIndex={paragraphIndex}
            wordIndex={wordIndex}
            wordInput={paragraphInput[wordIndex]}
          />
        )
      })}
    </div>
  )
}
