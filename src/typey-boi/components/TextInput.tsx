import * as React from 'react'
import { useKeyPress } from 'hooks/useKeyPress'
import './TextInput.scss'
import {
  addCharacter,
  removeCharacter,
  completeWord,
  completeParagraph,
} from 'actions/actions'
import { useDispatch } from 'react-redux'

export function TextInput(): React.ReactElement {
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

  return null
}
