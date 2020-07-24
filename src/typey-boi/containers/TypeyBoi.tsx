import * as React from 'react'
import { TextInput } from 'components/TextInput'
import { LoadText } from 'components/LoadText'
import { CompletedParagraphs } from 'components/paragraphs/CompletedParagraphs'
import { CurrentParagraph } from 'components/paragraphs/CurrentParagraph'
import { FutureParagraphs } from 'components/paragraphs/FutureParagraphs'

export function TypeyBoi(): React.ReactElement {
  return (
    <>
      <TextInput />
      <div className="container">
        <CompletedParagraphs />
        <CurrentParagraph />
        <FutureParagraphs />
      </div>
      <LoadText />
    </>
  )
}
