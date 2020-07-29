import styled from 'styled-components'

const ParagraphWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 300px;
  overflow: hidden;
`

export const CompletedParagraphs = styled(ParagraphWrapper)`
  justify-content: flex-end;
`

export const FutureParagraphs = styled(ParagraphWrapper)`
  justify-content: flex-start;
`

const Overlay = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`

export const CompletedParagraphOverlay = styled(Overlay)`
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    ${(props) => props.theme.background} 70%,
    ${(props) => props.theme.background} 100%
  );
`

export const FutureParagraphOverlay = styled(Overlay)`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    ${(props) => props.theme.background} 70%,
    ${(props) => props.theme.background} 100%
  );
`

export const Paragraph = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.5em 100px;
  max-width: 1300px;
`
