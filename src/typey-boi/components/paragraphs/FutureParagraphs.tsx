import * as React from 'react'
import * as S from './styles'
import { FutureWord } from 'components/words/FutureWord'
import { IState } from 'models/typey-boi'
import { useSelector } from 'react-redux'

export function FutureParagraphs(): React.ReactElement {
  const selectFutureParagraphs = (state: IState) => state.futureParagraphs
  const selectParagraphIndex = (state: IState) => state.currentParagraphIndex
  const futureParagraphs = useSelector(selectFutureParagraphs)
  const currentParagraphIndex = useSelector(selectParagraphIndex)

  return (
    <S.ParagraphWrapper>
      {futureParagraphs.map((paragraph: string[], index: number) => {
        const paragraphIndex = currentParagraphIndex + index + 1
        return (
          <S.Paragraph key={`future-paragraph-${index}`}>
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
          </S.Paragraph>
        )
      })}
    </S.ParagraphWrapper>
  )
}
