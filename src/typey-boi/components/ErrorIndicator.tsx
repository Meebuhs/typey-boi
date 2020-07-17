import * as React from 'react'

interface IProps {
  letter: string
}

export function ErrorIndicator(): React.ReactElement {
  return <div className={'error-indicator'}></div>
}
