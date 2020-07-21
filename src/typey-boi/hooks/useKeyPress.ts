import { useState, useEffect } from 'react'

export const useKeyPress = (callback: { (key: string): void }): string => {
  const [keyPressed, setKeyPressed] = useState()
  useEffect(() => {
    const downHandler = ({ key }) => {
      if (keyPressed !== key && (key.length === 1 || key === 'Backspace')) {
        setKeyPressed(key)
        callback && callback(key)
      }
    }
    const upHandler = () => {
      setKeyPressed(null)
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  })
  return keyPressed
}
