import * as React from 'react'
import useKeyPress from 'hooks/useKeyPress'
import './TextInput.scss'
import { CurrentLine } from 'components/lines/CurrentLine'
import { FutureLine } from 'components/lines/FutureLine'
import { CompletedLine } from 'components/lines/CompletedLine'
import { removeCharacter, completeWord, addCharacter } from 'actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from 'models/typey-boi'

export function TextInput(): React.ReactElement {
  const selectState = (state: IState) => state
  const {
    lines,
    lineInputs,
    currentLineIndex,
    currentWordIndex,
    currentLetterIndex,
  } = useSelector(selectState)
  const dispatch = useDispatch()

  useKeyPress((key: string) => {
    if (key === 'Backspace') {
      dispatch(removeCharacter())
    } else if (key === ' ') {
      dispatch(completeWord())
    } else {
      dispatch(addCharacter(key))
    }
  })

  return (
    <div className="container">
      {lines.map((line: string[], lineIndex: number) => {
        if (lineIndex > currentLineIndex) {
          return (
            <FutureLine
              key={`ln${lineIndex}`}
              line={line}
              lineIndex={lineIndex}
            />
          )
        } else if (lineIndex == currentLineIndex) {
          return (
            <CurrentLine
              key={`ln${lineIndex}`}
              line={line}
              lineIndex={lineIndex}
              currentWordIndex={currentWordIndex}
              currentLetterIndex={currentLetterIndex}
              lineInput={lineInputs[lineIndex]}
            />
          )
        } else {
          return (
            <CompletedLine
              key={`ln${lineIndex}`}
              line={line}
              lineIndex={lineIndex}
              lineInput={lineInputs[lineIndex]}
            />
          )
        }
      })}
    </div>
  )
}
