import * as React from 'react'
import { TextInput } from 'components/TextInput'
import { LoadText } from 'components/LoadText'
import { useSelector } from 'react-redux'
import { CompletedParagraphs } from 'components/paragraphs/CompletedParagraphs'
import { CurrentParagraph } from 'components/paragraphs/CurrentParagraph'
import { FutureParagraphs } from 'components/paragraphs/FutureParagraphs'
import { IState } from 'models/typey-boi'

export function TypeyBoi(): React.ReactElement {
  const selectState = (state: IState) => state
  const {
    completedParagraphs,
    currentParagraph,
    futureParagraphs,
    completedInputs,
    currentInput,
    currentParagraphIndex,
    currentWordIndex,
    currentLetterIndex,
  } = useSelector(selectState)

  return (
    <>
      <TextInput />
      <div className="container">
        <CompletedParagraphs
          completedParagraphs={completedParagraphs}
          completedInputs={completedInputs}
          currentParagraphIndex={currentParagraphIndex}
        />
        <CurrentParagraph
          key={`p${currentParagraphIndex}`}
          paragraph={currentParagraph}
          paragraphIndex={currentParagraphIndex}
          currentWordIndex={currentWordIndex}
          currentLetterIndex={currentLetterIndex}
          paragraphInput={currentInput}
        />
        <FutureParagraphs
          futureParagraphs={futureParagraphs}
          currentParagraphIndex={currentParagraphIndex}
        />
      </div>
      <LoadText />
    </>
  )
}
