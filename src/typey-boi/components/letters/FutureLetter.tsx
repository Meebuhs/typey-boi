import * as React from 'react'

interface IProps {
  letter: string
}

export function FutureLetter({ letter }: IProps): React.ReactElement {
  return <div className={`future-letter`}>{letter}</div>
}
