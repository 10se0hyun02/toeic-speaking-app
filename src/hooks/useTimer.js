import { useState, useEffect, useRef } from 'react'

export function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (running && seconds > 0) {
      ref.current = setInterval(() => setSeconds((s) => s - 1), 1000)
    } else if (seconds === 0) {
      setRunning(false)
    }
    return () => clearInterval(ref.current)
  }, [running, seconds])

  function start() { setRunning(true) }
  function pause() { setRunning(false) }
  function reset(s = initialSeconds) { setRunning(false); setSeconds(s) }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return { display: `${mm}:${ss}`, seconds, running, start, pause, reset, done: seconds === 0 }
}

export function useDualPhaseTimer({ prepSeconds, responseSeconds, onPrepEnd, onResponseEnd }) {
  const [phase, setPhase] = useState('prep')
  const [seconds, setSeconds] = useState(prepSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const phaseRef = useRef('prep')
  const secondsRef = useRef(prepSeconds)
  const onPrepEndRef = useRef(onPrepEnd)
  const onResponseEndRef = useRef(onResponseEnd)

  useEffect(() => { onPrepEndRef.current = onPrepEnd }, [onPrepEnd])
  useEffect(() => { onResponseEndRef.current = onResponseEnd }, [onResponseEnd])

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      secondsRef.current -= 1
      setSeconds(secondsRef.current)
      if (secondsRef.current <= 0) {
        if (phaseRef.current === 'prep') {
          phaseRef.current = 'response'
          setPhase('response')
          secondsRef.current = responseSeconds
          setSeconds(responseSeconds)
          onPrepEndRef.current?.()
        } else {
          clearInterval(intervalRef.current)
          setRunning(false)
          phaseRef.current = 'done'
          setPhase('done')
          onResponseEndRef.current?.()
        }
      }
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, responseSeconds])

  function start() { setRunning(true) }
  function pause() { setRunning(false) }

  function skip() {
    if (phaseRef.current !== 'prep') return
    clearInterval(intervalRef.current)
    phaseRef.current = 'response'
    setPhase('response')
    secondsRef.current = responseSeconds
    setSeconds(responseSeconds)
    onPrepEndRef.current?.()
    setRunning(true)
  }

  function reset(newPrepSeconds = prepSeconds, newResponseSeconds = responseSeconds) {
    clearInterval(intervalRef.current)
    setRunning(false)
    phaseRef.current = 'prep'
    setPhase('prep')
    secondsRef.current = newPrepSeconds
    setSeconds(newPrepSeconds)
  }

  function forceResponse() {
    clearInterval(intervalRef.current)
    phaseRef.current = 'response'
    setPhase('response')
    secondsRef.current = responseSeconds
    setSeconds(responseSeconds)
    setRunning(true)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return {
    phase,
    seconds,
    display: `${mm}:${ss}`,
    running,
    prepDone: phase !== 'prep',
    responseDone: phase === 'done',
    start,
    pause,
    skip,
    reset,
    forceResponse,
  }
}
