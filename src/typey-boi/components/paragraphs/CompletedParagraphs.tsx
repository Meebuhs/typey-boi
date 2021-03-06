import * as React from 'react'
import * as S from './styles'
import { COMPLETED_PARAGRAPHS_TO_KEEP } from 'constants/values'
import { CompletedWord } from 'components/words/CompletedWord'
import { IState } from 'models/typey-boi'
import { useSelector } from 'react-redux'

export function CompletedParagraphs(): React.ReactElement {
  const selectParagraphs = (state: IState) => state.completedParagraphs
  const selectInputs = (state: IState) => state.completedInputs
  const selectIndex = (state: IState) => state.currentParagraphIndex
  const completedParagraphs = useSelector(selectParagraphs)
  const completedInputs = useSelector(selectInputs)
  const currentParagraphIndex = useSelector(selectIndex)

  return (
    <S.CompletedParagraphs>
      <S.CompletedParagraphOverlay />
      {completedParagraphs.map((paragraph: string[], index: number) => {
        const paragraphIndex =
          currentParagraphIndex - COMPLETED_PARAGRAPHS_TO_KEEP + index
        return (
          <S.Paragraph key={`completed-paragraph-${index}`}>
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
          </S.Paragraph>
        )
      })}
    </S.CompletedParagraphs>
  )
}
