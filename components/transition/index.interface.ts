import React, { MutableRefObject, ReactElement } from 'react'

export interface TransitionProps {
  in?: boolean
  unmount?: boolean
  initial?: boolean
  timeout?: number

  children: (props: {
    visible: boolean
    status: string
    nodeRef: MutableRefObject<HTMLDivElement | null>
  }) => ReactElement
}

export interface TransitionContentProps {
  timeout?:
    | number
    | {
        enter: number
        exit: number
      }
  children: (props: {
    visible: boolean
    status: string
    nodeRef: MutableRefObject<HTMLDivElement | null>
  }) => ReactElement
  enterTimeout: MutableRefObject<NodeJS.Timeout | undefined>
  exitTimeout: MutableRefObject<NodeJS.Timeout | undefined>

  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void

  in?: boolean
  initial: boolean
  nodeRef?: MutableRefObject<HTMLDivElement | null>
}
