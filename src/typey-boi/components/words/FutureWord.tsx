import * as React from 'react'
import { FutureLetter } from '../letters/FutureLetter'

interface IProps {
  word: string
  wordIndex: number
  lineIndex: number
}

export function FutureWord({
  word,
  lineIndex,
  wordIndex,
}: IProps): React.ReactElement {
  return (
    <div className="word">
      {word.split('').map((letter: string, letterIndex: number) => (
        <FutureLetter
          key={`ln${lineIndex}-w${wordIndex}-lt${letterIndex}`}
          letter={letter}
        />
      ))}
    </div>
  )
}
