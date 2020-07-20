import * as React from 'react'
import { TextInput } from 'components/TextInput'

const text = 'This is placeholder text, it will be replaced later in development. \
This is placeholder text, it will be replaced later in development. \
This is placeholder text, it will be replaced later in development. \
This is placeholder text, it will be replaced later in development.'

export function TypeyBoi(): React.ReactElement {
  let characterCount = 0
  const characterThreshold = 40
  const lines = []
  let line = []
  for (const word of text.split(' ')) {
    if (characterCount + word.length < characterThreshold) {
      line.push(word)
      characterCount += word.length + 1
    } else {
      lines.push(line)
      line = [word]
      characterCount = 0
    }
  }

  return <TextInput lines={lines} />
}
