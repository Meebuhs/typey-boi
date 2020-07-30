import * as React from 'react'
import * as S from './styles'
import { useKeyPress } from 'hooks/useKeyPress'
import { currentTime } from 'utils/time'
import { IState, IStoredStats } from 'models/typey-boi'
import { useSelector, useDispatch } from 'react-redux'
import { useInterval } from 'hooks/useInterval'
import { AFK_TIMER_THRESHOLD } from 'constants/values'
import { addStats } from 'actions/actions'

interface IStatistics {
  correctLetters: number
  incorrectLetters: number
  extraLetters: number
  missedLetters: number
  correctSpaces: number
}

const emptyStats = {
  correctLetters: 0,
  incorrectLetters: 0,
  extraLetters: 0,
  missedLetters: 0,
  correctSpaces: 0,
}

export function Statistics(): React.ReactElement {
  const dispatch = useDispatch()

  const selectParagraph = (state: IState) => state.currentParagraph
  const selectInput = (state: IState) => state.currentInput
  const selectWordIndex = (state: IState) => state.currentWordIndex
  const selectLetterIndex = (state: IState) => state.currentLetterIndex
  const selectStats = (state: IState) => state.pastStats

  const currentParagraph = useSelector(selectParagraph)
  const currentInput = useSelector(selectInput)
  const currentWordIndex = useSelector(selectWordIndex)
  const currentLetterIndex = useSelector(selectLetterIndex)
  const pastStats = useSelector(selectStats)

  const [startTime, setStartTime] = React.useState(0)
  const [afkStats, setAfkStats] = React.useState({
    afk: false,
    lastInputTime: 0,
    wpm: 0,
    accuracy: 0,
  })
  const [stats, setStats] = React.useState(emptyStats)
  const [wpm, setWpm] = React.useState(0)
  const [accuracy, setAccuracy] = React.useState(0)

  useInterval(() => {
    updateStats(startTime, stats)
  }, 1000)

  const updateStats = (startTime: number, stats: IStatistics) => {
    if (startTime !== 0) {
      if (
        afkStats.lastInputTime !== 0 &&
        (currentTime() - afkStats.lastInputTime) / 1000 > AFK_TIMER_THRESHOLD
      ) {
        setAfk(startTime)
      } else {
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
  }

  const setAfk = (startTime: number) => {
    dispatch(
      addStats({
        date: Date.now(),
        sessionDuration: currentTime() - startTime,
        wpm: afkStats.wpm,
        accuracy: afkStats.accuracy,
      })
    )

    setAfkStats({
      ...afkStats,
      afk: true,
    })
    setStartTime(0)
    setWpm(0)
    setAccuracy(0)
    setStats(emptyStats)
  }

  useKeyPress((key: string) => {
    if (key !== 'Backspace') {
      if (startTime === 0) {
        setStartTime(currentTime())
      }

      setAfkStats({
        ...afkStats,
        afk: false,
        lastInputTime: currentTime(),
        wpm: wpm,
        accuracy: accuracy,
      })

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

  const getDateString = (date: number): string => {
    const parsedDate = new Date(date)
    return `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}`
  }

  return (
    <S.Statistics>
      <table style={{textAlign: "center"}}>
        <thead>
          <tr>
            <th></th>
            {pastStats.slice(-5).map((session: IStoredStats) => {
              return <th key={session.date}>{getDateString(session.date)}</th>
            })}
            <th>Now</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>WPM: </td>
            {pastStats.slice(-5).map((session: IStoredStats) => (
              <td key={`${session.date}.wpm`}>{session.wpm.toFixed(2)}</td>
            ))}
            <td>{wpm.toFixed(2)}</td>
          </tr>

          <tr>
            <td>ACC: </td>
            {pastStats.slice(-5).map((session: IStoredStats) => (
              <td key={`${session.date}.wpm`}>{session.accuracy.toFixed(2)}</td>
            ))}
            <td>{accuracy.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <S.AfkIndicator visible={afkStats.afk}>Typing Stopped</S.AfkIndicator>
    </S.Statistics>
  )
}
