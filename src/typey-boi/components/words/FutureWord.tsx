import * as React from 'react'
import * as S from './styles'
import { FutureLetter } from 'components/letters/FutureLetter'

interface IProps {
  word: string
  wordIndex: number
  paragraphIndex: number
}

export function FutureWord({
  word,
  wordIndex,
  paragraphIndex,
}: IProps): React.ReactElement {
  return (
    <S.Word>
      {word.split('').map((letter: string, letterIndex: number) => (
        <FutureLetter
          key={`p${paragraphIndex}-w${wordIndex}-l${letterIndex}`}
          letter={letter}
        />
      ))}
    </S.Word>
  )
}
