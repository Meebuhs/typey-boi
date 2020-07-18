import * as React from 'react'

interface IProps {
  letter: string
}

export function CurrentLetter({ letter }: IProps): React.ReactElement {
  return <div className={`current-letter`}>{letter}</div>
}
