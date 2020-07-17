import * as React from 'react'

interface IProps {
  letter: string
}

export function MissedLetter( { letter }: IProps): React.ReactElement {
  return <div className={'missed-letter'}>{letter}</div>
}
