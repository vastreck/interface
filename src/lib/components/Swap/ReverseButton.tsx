import { useAtom } from 'jotai'
import { ArrowDown as ArrowDownIcon, ArrowUp as ArrowUpIcon } from 'lib/icons'
import styled, { Layer } from 'lib/theme'
import { useCallback } from 'react'

import Button from '../Button'
import Row from '../Row'
import { stateAtom } from './state'

const ReverseRow = styled(Row)`
  bottom: -1.5em;
  position: absolute;
  width: 100%;
  z-index: ${Layer.OVERLAY};
`

const ArrowUp = styled(ArrowUpIcon)`
  left: calc(50% - 0.37em);
  position: absolute;
  top: calc(50% - 0.82em);
`

const ArrowDown = styled(ArrowDownIcon)`
  bottom: calc(50% - 0.82em);
  position: absolute;
  right: calc(50% - 0.37em);
`

const Overlay = styled.div`
  background-color: ${({ theme }) => theme.container};
  border-radius: ${({ theme }) => theme.borderRadius}em;
  padding: 0.25em;
`

const StyledReverseButton = styled(Button)`
  border-radius: ${({ theme }) => theme.borderRadius * 0.75}em;
  height: 2.5em;
  position: relative;
  width: 2.5em;
`

export default function ReverseButton({ disabled }: { disabled?: boolean }) {
  const [state, setState] = useAtom(stateAtom)
  const onClick = useCallback(() => {
    const { input, output } = state
    setState((state) => {
      state.input = output
      state.output = input
    })
  }, [state, setState])

  return (
    <ReverseRow justify="center">
      <Overlay>
        <StyledReverseButton disabled={disabled} onClick={onClick}>
          <ArrowUp strokeWidth={3} />
          <ArrowDown strokeWidth={3} />
        </StyledReverseButton>
      </Overlay>
    </ReverseRow>
  )
}