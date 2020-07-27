import * as React from 'react'
import * as S from './styles'

interface IProps {
  letter: string
}

export function FutureLetter({ letter }: IProps): React.ReactElement {
  return <S.FutureLetter>{letter}</S.FutureLetter>
}
