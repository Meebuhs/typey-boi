import styled, { keyframes } from 'styled-components'

export const Letter = styled.div`
  font-family: 'Fira Code', Courier, monospace;
  font-size: 1rem;
`

export const FutureLetter = styled(Letter)`
  color: grey;
`

export const MissedLetter = styled(Letter)`
  color: grey;
`

export const CorrectLetter = styled(Letter)`
  color: green;
  font-weight: bold;
`

export const IncorrectLetter = styled(Letter)`
  color: red;
  font-weight: bold;
`

export const ExtraLetter = styled(Letter)`
  color: red;
  font-weight: bold;
`

export const letterIndicator = keyframes`
    from {
      background-color: white;
    }
  
    25% {
      background-color: white;
    }
  
    to {
      background-color: grey;
    }
`

export const CurrentLetter = styled(Letter)`
  animation: ${letterIndicator} 0.75s ease-out 0s infinite alternate;
  background-color: grey;
  color: grey;
`
