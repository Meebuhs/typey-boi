import * as React from 'react'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { IFileReaderEvent, IFileSelectorEvent } from 'constants/types'
import { useDispatch } from 'react-redux'
import { setText } from 'actions/actions'

interface IState {
  initialised: boolean
  error: boolean
  loading: boolean
  fileName: string
  fileSelector: HTMLInputElement
}

const initialState: IState = {
  initialised: false,
  error: false,
  loading: false,
  fileName: '',
  fileSelector: undefined,
}

export function LoadText(): React.ReactElement {
  const dispatch = useDispatch()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    initialiseFileInput()
  })

  const initialiseFileInput = () => {
    const fileSelector = buildFileSelector()
    if (!state.initialised) {
      setState({
        ...state,
        initialised: true,
        error: false,
        fileSelector: fileSelector,
      })
    }
  }

  const buildFileSelector = () => {
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('accept', '.txt')
    fileSelector.addEventListener('change', handleFileChosen)
    return fileSelector
  }

  const readText = (event: IFileReaderEvent) => {
    dispatch(setText(event.target.result))
  }

  const handleFileChosen = (event: IFileSelectorEvent) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.addEventListener('load', readText)
      fileReader.readAsText(event.target.files[0])
      setState({ ...state, fileName: event.target.files[0].name })
      document.getElementById("current-paragraph").focus()
    }
  }

  const handleFileSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    state.fileSelector.click()
  }

  return (
    <S.LoadTextButton
      key={'file-select'}
      className={'file-button'}
      onClick={handleFileSelect}
    >
      load text
    </S.LoadTextButton>
  )
}
