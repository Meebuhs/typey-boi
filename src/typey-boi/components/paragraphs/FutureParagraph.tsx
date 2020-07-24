import * as React from 'react'
import { FutureWord } from 'components/words/FutureWord'

interface IProps {
  paragraph: string[]
  paragraphIndex: number
}

export function FutureParagraph({
  paragraph,
  paragraphIndex,
}: IProps): React.ReactElement {
  return (
    <div className="future-paragraph">
      {paragraph.map((word: string, wordIndex: number) => {
        return (
          <FutureWord
            key={`p${paragraphIndex}-w${wordIndex}`}
            paragraphIndex={paragraphIndex}
            word={word}
            wordIndex={wordIndex}
          />
        )
      })}
    </div>
  )
}
