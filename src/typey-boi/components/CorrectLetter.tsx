import * as React from 'react'

interface IProps {
  letter: string
}

export function CorrectLetter({ letter }: IProps): React.ReactElement {
  return <div className={'correct-letter'}>{letter}</div>
}
