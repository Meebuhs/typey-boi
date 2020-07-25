// From Dan Abramov's blog post about using hooks and setInterval together
// Read more here https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from 'react'

export function useInterval(
  callback: { (key: string): void },
  delay: number
): void {
  const savedCallback = useRef(null)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
