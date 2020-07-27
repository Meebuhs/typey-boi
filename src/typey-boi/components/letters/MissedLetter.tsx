import * as React from 'react'
import * as S from './styles'

interface IProps {
  letter: string
}

export function MissedLetter({ letter }: IProps): React.ReactElement {
  return <S.MissedLetter>{letter}</S.MissedLetter>
}
