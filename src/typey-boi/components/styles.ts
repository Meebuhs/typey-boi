import styled, { keyframes } from 'styled-components'

export const ErrorIndicator = styled.div`
  border-bottom: ${(props) => props.theme.incorrectLetter} solid 2px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`

const letterIndicator = (highlight: string, background: string) => keyframes`
  from {
    border-color: ${highlight}
  }

  25% {
    border-color: ${highlight}
  }

  to {
    border-color: ${background}
  }
`

export interface TypingIndicatorProps {
  width: number
}

export const TypingIndicator = styled.div<TypingIndicatorProps>`
  animation: ${(props) =>
      letterIndicator(props.theme.primaryHighlight, props.theme.background)}
    0.6s ease-out 0s infinite alternate;
  border-right: 2px solid ${(props) => props.theme.primaryHighlight};
  left: 0;
  width: ${(props) => props.width}px;
  height: 100%;
  position: absolute;
`

export const Statistics = styled.div`
  font-family: 'Noto Sans', Helvetica, sans-serif;
  color: ${(props) => props.theme.statistics};
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 1em;
  z-index: 3;
`

export interface AfkIndicatorProps {
  visible: boolean
}

export const AfkIndicator = styled.div<AfkIndicatorProps>`
  background: ${(props) => props.theme.primaryHighlight};
  color: ${(props) => props.theme.background};
  font-family: 'Noto Sans', Helvetica, sans-serif;
  font-size: 1em;
  font-weight: bold;
  margin: 0 auto;
  padding: 0.5em 1.5em;
  border: 2px solid ${(props) => props.theme.primaryHighlight};
  border-radius: 3px;
  transition: opacity 1s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: fixed;
  bottom: 3em;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`

export const LoadTextButton = styled.button`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.primaryHighlight};
  font-family: 'Noto Sans', Helvetica, sans-serif;
  font-size: 1em;
  font-weight: bold;
  margin: 1em;
  padding: 1em 2em;
  border: 2px solid ${(props) => props.theme.primaryHighlight};
  border-radius: 3px;
  transition: background 0.6s;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 3;

  &:hover {
    background: ${(props) => props.theme.primaryHighlight};
    color: ${(props) => props.theme.background};
  }
`
