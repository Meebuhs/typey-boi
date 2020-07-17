import * as React from 'react'
import { FutureLetter } from './FutureLetter'

interface IProps {
  word: string
  wordIndex: number
}

export function FutureWord({ word, wordIndex }: IProps): React.ReactElement {
  return (
    <div className="word">
      {word.split('').map((letter: string, letterIndex: number) => (
        <FutureLetter key={`w${wordIndex}-l${letterIndex}`} letter={letter} />
      ))}
    </div>
  )
}
