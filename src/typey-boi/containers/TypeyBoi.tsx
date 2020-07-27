import * as React from 'react'
import * as S from './styles'
import { TextInput } from 'components/TextInput'
import { LoadText } from 'components/LoadText'
import { CompletedParagraphs } from 'components/paragraphs/CompletedParagraphs'
import { CurrentParagraph } from 'components/paragraphs/CurrentParagraph'
import { FutureParagraphs } from 'components/paragraphs/FutureParagraphs'
import { Statistics } from 'components/Statistics'

export function TypeyBoi(): React.ReactElement {
  return (
    <>
      <TextInput />
      <S.Container>
        <CompletedParagraphs />
        <CurrentParagraph />
        <FutureParagraphs />
      </S.Container>
      <Statistics />
      <LoadText />
    </>
  )
}
