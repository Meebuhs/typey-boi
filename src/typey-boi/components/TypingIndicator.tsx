import * as React from 'react'
import * as S from './styles'

interface IProps {
  width: number
}

export function TypingIndicator({ width }: IProps): React.ReactElement {
  return <S.TypingIndicator width={width}></S.TypingIndicator>
}
