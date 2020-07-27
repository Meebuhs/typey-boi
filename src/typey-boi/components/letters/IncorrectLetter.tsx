import * as React from 'react'
import * as S from './styles'

interface IProps {
  letter: string
}

export function IncorrectLetter({ letter }: IProps): React.ReactElement {
  return <S.IncorrectLetter>{letter}</S.IncorrectLetter>
}
