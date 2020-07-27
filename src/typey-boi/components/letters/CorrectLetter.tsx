import * as React from 'react'
import * as S from './styles'

interface IProps {
  letter: string
}

export function CorrectLetter({ letter }: IProps): React.ReactElement {
  return <S.CorrectLetter>{letter}</S.CorrectLetter>
}
