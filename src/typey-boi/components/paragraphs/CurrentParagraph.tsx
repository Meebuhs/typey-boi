import * as React from 'react'
import { FutureWord } from 'components/words/FutureWord'
import { CompletedWord } from 'components/words/CompletedWord'
import { CurrentWord } from 'components/words/CurrentWord'

interface IProps {
  paragraph: string[]
  paragraphIndex: number
  currentWordIndex: number
  currentLetterIndex: number
  paragraphInput: string[]
}

export function CurrentParagraph({
  paragraph,
  paragraphIndex,
  currentWordIndex,
  currentLetterIndex,
  paragraphInput,
}: IProps): React.ReactElement {
  return (
    <div className="current-paragraph">
      {paragraph.map((word: string, wordIndex: number) => {
        if (wordIndex > currentWordIndex) {
          return (
            <FutureWord
              key={`p${paragraphIndex}-w${wordIndex}`}
              word={word}
              paragraphIndex={paragraphIndex}
              wordIndex={wordIndex}
            />
          )
        } else if (wordIndex == currentWordIndex) {
          return (
            <CurrentWord
              key={`p${paragraphIndex}-w${wordIndex}`}
              word={word}
              wordIndex={wordIndex}
              paragraphIndex={paragraphIndex}
              currentLetterIndex={currentLetterIndex}
              wordInput={paragraphInput[wordIndex]}
            />
          )
        } else {
          return (
            <CompletedWord
              key={`p${paragraphIndex}-w${wordIndex}`}
              word={word}
              wordIndex={wordIndex}
              paragraphIndex={paragraphIndex}
              wordInput={paragraphInput[wordIndex]}
            />
          )
        }
      })}
    </div>
  )
}
