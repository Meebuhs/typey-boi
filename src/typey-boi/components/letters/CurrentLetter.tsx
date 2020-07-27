import * as React from 'react'
import * as S from './styles'

interface IProps {
  letter: string
}

export function CurrentLetter({ letter }: IProps): React.ReactElement {
  return <S.CurrentLetter>{letter}</S.CurrentLetter>
}
