import * as React from 'react'
import { useKeyPress } from 'hooks/useKeyPress'
import './TextInput.scss'
import { CurrentParagraph } from 'components/paragraphs/CurrentParagraph'
import { FutureParagraph } from 'components/paragraphs/FutureParagraph'
import { CompletedParagraph } from 'components/paragraphs/CompletedParagraph'
import {
  addCharacter,
  removeCharacter,
  completeWord,
  completeParagraph,
} from 'actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from 'models/typey-boi'
import {
  FUTURE_PARAGRAPHS_TO_LOAD,
  COMPLETED_PARAGRAPHS_TO_KEEP,
} from 'constants/values'

export function TextInput(): React.ReactElement {
  const selectState = (state: IState) => state
  const {
    completedParagraphs,
    currentParagraph,
    futureParagraphs,
    userInput,
    currentParagraphIndex,
    currentWordIndex,
    currentLetterIndex,
  } = useSelector(selectState)
  const dispatch = useDispatch()

  useKeyPress((key: string) => {
    if (key === 'Backspace') {
      dispatch(removeCharacter())
    } else if (key === 'Enter') {
      dispatch(completeParagraph())
    } else if (key === ' ') {
      dispatch(completeWord())
    } else {
      dispatch(addCharacter(key))
    }
  })

  return (
    <div className="container">
      {completedParagraphs.map((paragraph: string[], index: number) => {
        const paragraphIndex =
          currentParagraphIndex - COMPLETED_PARAGRAPHS_TO_KEEP + index
        return (
          <CompletedParagraph
            key={`p${paragraphIndex}`}
            paragraph={paragraph}
            paragraphIndex={paragraphIndex}
            paragraphInput={userInput[index]}
          />
        )
      })}
      <CurrentParagraph
        key={`p${currentParagraphIndex}`}
        paragraph={currentParagraph}
        paragraphIndex={currentParagraphIndex}
        currentWordIndex={currentWordIndex}
        currentLetterIndex={currentLetterIndex}
        paragraphInput={userInput[userInput.length - 1]}
      />
      {futureParagraphs.map((paragraph: string[], index: number) => {
        const paragraphIndex = currentParagraphIndex + index + 1
        return (
          <FutureParagraph
            key={`p${paragraphIndex}`}
            paragraph={paragraph}
            paragraphIndex={paragraphIndex}
          />
        )
      })}
    </div>
  )
}
