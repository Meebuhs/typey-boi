import * as React from 'react'
import { useKeyPress } from 'hooks/useKeyPress'
import { currentTime } from 'utils/time'
import { IState } from 'models/typey-boi'
import { useSelector } from 'react-redux'
import { useInterval } from 'hooks/useInterval'

export function Statistics(): React.ReactElement {
  const selectParagraph = (state: IState) => state.currentParagraph
  const selectInput = (state: IState) => state.currentInput
  const selectWordIndex = (state: IState) => state.currentWordIndex
  const selectLetterIndex = (state: IState) => state.currentLetterIndex

  const currentParagraph = useSelector(selectParagraph)
  const currentInput = useSelector(selectInput)
  const currentWordIndex = useSelector(selectWordIndex)
  const currentLetterIndex = useSelector(selectLetterIndex)

  const [startTime, setStartTime] = React.useState(0)
  const [stats, setStats] = React.useState({
    correctLetters: 0,
    incorrectLetters: 0,
    extraLetters: 0,
    missedLetters: 0,
    correctSpaces: 0,
  })
  const [wpm, setWpm] = React.useState(0)
  const [accuracy, setAccuracy] = React.useState(0)

  useInterval(() => {
    updateStats(startTime, stats)
  }, 1000)

  const updateStats = (
    time: number,
    stats: {
      correctLetters: number
      incorrectLetters: number
      extraLetters: number
      missedLetters: number
      correctSpaces: number
    }
  ) => {
    if (time !== 0) {
      const {
        correctLetters,
        incorrectLetters,
        extraLetters,
        missedLetters,
        correctSpaces,
      } = stats
      const elapsedTime = (currentTime() - startTime) / 1000
      setWpm(((correctLetters + correctSpaces) * (60 / elapsedTime)) / 5)
      setAccuracy(
        ((correctLetters + correctSpaces) /
          (correctLetters +
            correctSpaces +
            incorrectLetters +
            extraLetters +
            missedLetters)) *
          100
      )
    }
  }

  useKeyPress((key: string) => {
    if (key !== 'Backspace') {
      if (startTime === 0) {
        setStartTime(currentTime())
      }

      const wordLength = currentParagraph[currentWordIndex].length
      const inputLength = currentInput[currentWordIndex].length
      if (key === ' ') {
        if (wordLength === inputLength) {
          setStats({
            ...stats,
            correctSpaces: stats.correctSpaces + 1,
          })
        } else if (wordLength > inputLength) {
          setStats({
            ...stats,
            missedLetters: stats.missedLetters + (wordLength - inputLength),
          })
        }
      } else if (key === 'Enter') {
        if (currentWordIndex === currentParagraph.length - 1) {
          if (wordLength === inputLength) {
            setStats({
              ...stats,
              correctSpaces: stats.correctSpaces + 1,
            })
          } else if (wordLength > inputLength) {
            setStats({
              ...stats,
              missedLetters: stats.missedLetters + (wordLength - inputLength),
            })
          }
        }
      } else {
        if (inputLength >= wordLength) {
          setStats({
            ...stats,
            extraLetters: stats.extraLetters + 1,
          })
        } else if (
          key === currentParagraph[currentWordIndex][currentLetterIndex]
        ) {
          setStats({
            ...stats,
            correctLetters: stats.correctLetters + 1,
          })
        } else {
          setStats({
            ...stats,
            incorrectLetters: stats.incorrectLetters + 1,
          })
        }
      }
    }
  })

  return (
    <div className="statistics">
      <div className="wpm">WPM: {wpm.toFixed(2)}</div>
      <div className="accuracy">ACC: {accuracy.toFixed(2)}%</div>
    </div>
  )
}
