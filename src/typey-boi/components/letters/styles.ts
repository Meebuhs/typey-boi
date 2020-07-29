import styled from 'styled-components'

const Letter = styled.div`
  font-family: 'Fira Code', Courier, monospace;
  font-size: 1rem;
  box-sizing: border-box;
`

export const FutureLetter = styled(Letter)`
  color: ${(props) => props.theme.futureLetter};
`

export const CurrentLetter = styled(Letter)`
  position: relative;
  color: ${(props) => props.theme.currentLetter};
`

export const MissedLetter = styled(Letter)`
  color: ${(props) => props.theme.futureLetter};
`

export const CorrectLetter = styled(Letter)`
  color: ${(props) => props.theme.correctLetter};
`

export const IncorrectLetter = styled(Letter)`
  color: ${(props) => props.theme.incorrectLetter};
`

export const ExtraLetter = styled(Letter)`
  color: ${(props) => props.theme.extraLetter};
`
