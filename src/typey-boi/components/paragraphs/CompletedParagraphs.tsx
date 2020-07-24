import * as React from 'react'
import { COMPLETED_PARAGRAPHS_TO_KEEP } from 'constants/values'
import { CompletedWord } from 'components/words/CompletedWord'

interface IProps {
  completedParagraphs: string[][]
  completedInputs: string[][]
  currentParagraphIndex: number
}

export function CompletedParagraphs({
  completedParagraphs,
  completedInputs,
  currentParagraphIndex,
}: IProps): React.ReactElement {
  return (
    <div className="completed-paragraphs">
      {completedParagraphs.map((paragraph: string[], index: number) => {
        const paragraphIndex =
          currentParagraphIndex - COMPLETED_PARAGRAPHS_TO_KEEP + index
        return (
          <div
            className="completed-paragraph"
            key={`completed-paragraph-${index}`}
          >
            {paragraph.map((word: string, wordIndex: number) => {
              return (
                <CompletedWord
                  key={`p${paragraphIndex}-w${wordIndex}`}
                  word={word}
                  paragraphIndex={paragraphIndex}
                  wordIndex={wordIndex}
                  wordInput={completedInputs[index][wordIndex]}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
