import * as React from 'react'
import * as S from './styles'
import { FutureWord } from 'components/words/FutureWord'
import { CompletedWord } from 'components/words/CompletedWord'
import { CurrentWord } from 'components/words/CurrentWord'
import { IState } from 'models/typey-boi'
import { useSelector } from 'react-redux'

export function CurrentParagraph(): React.ReactElement {
  const selectParagraph = (state: IState) => state.currentParagraph
  const selectInput = (state: IState) => state.currentInput
  const selectParagraphIndex = (state: IState) => state.currentParagraphIndex
  const selectWordIndex = (state: IState) => state.currentWordIndex
  const selectLetterIndex = (state: IState) => state.currentLetterIndex

  const currentParagraph = useSelector(selectParagraph)
  const currentInput = useSelector(selectInput)
  const currentParagraphIndex = useSelector(selectParagraphIndex)
  const currentWordIndex = useSelector(selectWordIndex)
  const currentLetterIndex = useSelector(selectLetterIndex)

  return (
    <S.Paragraph>
      {currentParagraph.map((word: string, wordIndex: number) => {
        if (wordIndex > currentWordIndex) {
          return (
            <FutureWord
              key={`p${currentParagraphIndex}-w${wordIndex}`}
              word={word}
              paragraphIndex={currentParagraphIndex}
              wordIndex={wordIndex}
            />
          )
        } else if (wordIndex == currentWordIndex) {
          return (
            <CurrentWord
              key={`p${currentParagraphIndex}-w${wordIndex}`}
              word={word}
              wordIndex={wordIndex}
              paragraphIndex={currentParagraphIndex}
              currentLetterIndex={currentLetterIndex}
              wordInput={currentInput[wordIndex]}
            />
          )
        } else {
          return (
            <CompletedWord
              key={`p${currentParagraphIndex}-w${wordIndex}`}
              word={word}
              wordIndex={wordIndex}
              paragraphIndex={currentParagraphIndex}
              wordInput={currentInput[wordIndex]}
            />
          )
        }
      })}
    </S.Paragraph>
  )
}
