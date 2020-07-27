import * as React from 'react'
import * as S from './styles'

interface IProps {
  letter: string
}

export function ExtraLetter({ letter }: IProps): React.ReactElement {
  return <S.ExtraLetter>{letter}</S.ExtraLetter>
}
