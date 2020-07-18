import * as React from 'react'

interface IProps {
  letter: string
}

export function ExtraLetter({ letter }: IProps): React.ReactElement {
  return <div className={'extra-letter'}>{letter}</div>
}
