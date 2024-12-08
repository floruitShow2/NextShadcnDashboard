import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, usePresence } from 'framer-motion'
import type { TransitionContentProps, TransitionProps } from './index.interface'

const TransitionContent = (props: TransitionContentProps) => {
  const {
    children,
    timeout = 0,
    enterTimeout,
    exitTimeout,
    onEnter,
    onEntered,
    onExit,
    onExited,
    initial,
    nodeRef: defaultNodeRef,
    in: show
  } = props

  const [status, setStatus] = useState(initial ? 'exited' : 'entered')
  const [isPresent, safeToRemove] = usePresence()
  const [hasEntered, setHasEntered] = useState(initial ? false : true)
  const splitTimeout = typeof timeout === 'object'
  const internalNodeRef = useRef(null)
  const nodeRef = defaultNodeRef || internalNodeRef
  const visible = hasEntered && show ? isPresent : false

  useEffect(() => {
    if (hasEntered || !show) return

    const actualTimeout = splitTimeout ? timeout.enter : timeout

    clearTimeout(enterTimeout.current)
    clearTimeout(exitTimeout.current)

    setHasEntered(true)
    setStatus('entering')
    onEnter?.()

    // Force reflow
    nodeRef.current?.offsetHeight

    enterTimeout.current = setTimeout(() => {
      setStatus('entered')
      onEntered?.()
    }, actualTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEnter, onEntered, timeout, status, show])

  useEffect(() => {
    if (isPresent && show) return

    const actualTimeout = splitTimeout ? timeout.exit : timeout

    clearTimeout(enterTimeout.current)
    clearTimeout(exitTimeout.current)

    setStatus('exiting')
    onExit?.()

    // Force reflow
    nodeRef.current?.offsetHeight

    exitTimeout.current = setTimeout(() => {
      setStatus('exited')
      safeToRemove?.()
      onExited?.()
    }, actualTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent, onExit, safeToRemove, timeout, onExited, show])

  return children({ visible, status, nodeRef })
}

export const Transition = (props: TransitionProps) => {
  const { children, in: show, unmount, initial = true, ...restProps } = props

  const enterTimeout = useRef<NodeJS.Timeout>()
  const exitTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeout.current)
    } else {
      clearTimeout(enterTimeout.current)
    }
  }, [show])

  return (
    <AnimatePresence>
      {(show || !unmount) && (
        <TransitionContent
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          in={show}
          initial={initial}
          {...restProps}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  )
}
