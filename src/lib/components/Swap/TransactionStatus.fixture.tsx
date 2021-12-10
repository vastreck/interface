import assert from 'assert'
import { useUpdateAtom } from 'jotai/utils'
import { DAI, ETH } from 'lib/mocks'
import { useEffect } from 'react'
import { useSelect } from 'react-cosmos/fixture'

import { Modal } from '../Dialog'
import { transactionAtom } from './state'
import TransactionStatusDialog from './TransactionStatusDialog'

function Fixture() {
  const setTransaction = useUpdateAtom(transactionAtom)

  const [state] = useSelect('state', {
    options: ['PENDING', 'ERROR', 'SUCCESS'],
  })
  useEffect(() => {
    setTransaction({
      input: { token: ETH, value: 1 },
      output: { token: DAI, value: 4200 },
      receipt: '',
      timestamp: Date.now(),
    })
  }, [setTransaction])
  useEffect(() => {
    switch (state) {
      case 'PENDING':
        setTransaction({
          input: { token: ETH, value: 1 },
          output: { token: DAI, value: 4200 },
          receipt: '',
          timestamp: Date.now(),
        })
        break
      case 'ERROR':
        setTransaction((tx) => {
          assert(tx)
          tx.status = new Error(
            'Swap failed: Unknown error: "Error: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar, risus eu pretium condimentum, tellus dui fermentum turpis, id gravida metus justo ac lorem. Etiam vitae dapibus eros, nec elementum ipsum. Duis condimentum, felis vel tempor ultricies, eros diam tempus odio, at tempor urna odio id massa. Aliquam laoreet turpis justo, auctor accumsan est pellentesque at. Integer et dolor feugiat, sodales tortor non, cursus augue. Phasellus id suscipit justo, in ultricies tortor. Aenean libero nibh, egestas sit amet vehicula sit amet, tempor ac ligula. Cras at tempor lectus. Mauris sollicitudin est velit, nec consectetur lorem dapibus ut. Praesent magna ex, faucibus ac fermentum malesuada, molestie at ex. Phasellus bibendum lorem nec dolor dignissim eleifend. Nam dignissim varius velit, at volutpat justo pretium id."'
          )
          tx.elapsedMs = Date.now() - tx.timestamp
        })
        break
      case 'SUCCESS':
        setTransaction((tx) => {
          assert(tx)
          tx.status = true
          tx.elapsedMs = Date.now() - tx.timestamp
        })
        break
    }
  }, [setTransaction, state])
  return <TransactionStatusDialog onClose={() => void 0} />
}

export default (
  <Modal color="dialog">
    <Fixture />
  </Modal>
)