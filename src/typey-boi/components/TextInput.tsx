import * as React from 'react'
import { useKeyPress } from 'hooks/useKeyPress'
import './TextInput.scss'
import { CurrentParagraph } from 'components/paragraphs/CurrentParagraph'
import { FutureParagraph } from 'components/paragraphs/FutureParagraph'
import { CompletedParagraph } from 'components/paragraphs/CompletedParagraph'
import { removeCharacter, completeWord, addCharacter, completeParagraph } from 'actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from 'models/typey-boi'

export function TextInput(): React.ReactElement {
  const selectState = (state: IState) => state
  const {
    paragraphs,
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
      {paragraphs.map((paragraph: string[], paragraphIndex: number) => {
        if (paragraphIndex > currentParagraphIndex) {
          return (
            <FutureParagraph
              key={`p${paragraphIndex}`}
              paragraph={paragraph}
              paragraphIndex={paragraphIndex}
            />
          )
        } else if (paragraphIndex == currentParagraphIndex) {
          return (
            <CurrentParagraph
              key={`p${paragraphIndex}`}
              paragraph={paragraph}
              paragraphIndex={paragraphIndex}
              currentWordIndex={currentWordIndex}
              currentLetterIndex={currentLetterIndex}
              paragraphInput={userInput[paragraphIndex]}
            />
          )
        } else {
          return (
            <CompletedParagraph
              key={`p${paragraphIndex}`}
              paragraph={paragraph}
              paragraphIndex={paragraphIndex}
              paragraphInput={userInput[paragraphIndex]}
            />
          )
        }
      })}
    </div>
  )
}
