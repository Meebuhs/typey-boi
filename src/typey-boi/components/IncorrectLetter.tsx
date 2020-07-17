import * as React from 'react'

interface IProps {
  letter: string
}

export function IncorrectLetter({ letter }: IProps): React.ReactElement {
  return <div className={'incorrect-letter'}>{letter}</div>
}
