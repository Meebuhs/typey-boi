import * as React from 'react'
import { FutureWord } from 'components/words/FutureWord'

interface IProps {
  futureParagraphs: string[][]
  currentParagraphIndex: number
}

export function FutureParagraphs({
  futureParagraphs,
  currentParagraphIndex,
}: IProps): React.ReactElement {
  return (
    <div className="future-paragraphs">
      {futureParagraphs.map((paragraph: string[], index: number) => {
        const paragraphIndex = currentParagraphIndex + index + 1
        return (
          <div className="future-paragraph" key={`future-paragraph-${index}`}>
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
      })}
    </div>
  )
}
