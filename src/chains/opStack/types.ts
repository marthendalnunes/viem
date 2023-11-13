import type { Block, BlockTag } from '../../types/block.js'
import type { FeeValuesEIP1559 } from '../../types/fee.js'
import type { Hash, Hex } from '../../types/misc.js'
import type {
  Index,
  Quantity,
  RpcBlock,
  RpcTransaction as RpcTransaction_,
  RpcTransactionReceipt,
} from '../../types/rpc.js'
import type {
  Transaction as Transaction_,
  TransactionBase,
  TransactionReceipt,
} from '../../types/transaction.js'

export type OpStackBlockOverrides = {
  stateRoot: Hash
}
export type OpStackBlock<
  TIncludeTransactions extends boolean = boolean,
  TBlockTag extends BlockTag = BlockTag,
> = Block<
  bigint,
  TIncludeTransactions,
  TBlockTag,
  OpStackTransaction<TBlockTag extends 'pending' ? true : false>
> &
  OpStackBlockOverrides

export type OpStackRpcBlockOverrides = {
  stateRoot: Hash
}
export type OpStackRpcBlock<
  TBlockTag extends BlockTag = BlockTag,
  TIncludeTransactions extends boolean = boolean,
> = RpcBlock<
  TBlockTag,
  TIncludeTransactions,
  OpStackRpcTransaction<TBlockTag extends 'pending' ? true : false>
> &
  OpStackRpcBlockOverrides

type RpcTransaction<TPending extends boolean = boolean> =
  RpcTransaction_<TPending> & {
    isSystemTx?: undefined
    mint?: undefined
    sourceHash?: undefined
  }

export type OpStackRpcDepositTransaction<TPending extends boolean = boolean> =
  Omit<TransactionBase<Quantity, Index, TPending>, 'typeHex'> &
    FeeValuesEIP1559<Quantity> & {
      isSystemTx?: boolean
      mint?: Hex
      sourceHash: Hex
      type: '0x7e'
    }
export type OpStackRpcTransaction<TPending extends boolean = boolean> =
  | RpcTransaction<TPending>
  | OpStackRpcDepositTransaction<TPending>

export type OpStackRpcTransactionReceiptOverrides = {
  l1GasPrice: Hex | null
  l1GasUsed: Hex | null
  l1Fee: Hex | null
  l1FeeScalar: `${number}` | null
}
export type OpStackRpcTransactionReceipt = RpcTransactionReceipt &
  OpStackRpcTransactionReceiptOverrides

type Transaction<TPending extends boolean = boolean> = Transaction_<
  bigint,
  number,
  TPending
> & {
  isSystemTx?: undefined
  mint?: undefined
  sourceHash?: undefined
}

export type OpStackDepositTransaction<TPending extends boolean = boolean> =
  TransactionBase<bigint, number, TPending> &
    FeeValuesEIP1559 & {
      isSystemTx?: boolean
      mint?: bigint
      sourceHash: Hex
      type: 'deposit'
    }

export type OpStackTransaction<TPending extends boolean = boolean> =
  | Transaction<TPending>
  | OpStackDepositTransaction<TPending>

export type OpStackTransactionReceiptOverrides = {
  l1GasPrice: bigint | null
  l1GasUsed: bigint | null
  l1Fee: bigint | null
  l1FeeScalar: number | null
}
export type OpStackTransactionReceipt = TransactionReceipt &
  OpStackTransactionReceiptOverrides