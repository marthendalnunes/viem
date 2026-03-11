import { parseAbi } from 'abitype'
import { describe, expectTypeOf, test } from 'vitest'
import { accounts } from '~test/constants.js'
import { privateKeyToAccount } from '../accounts/privateKeyToAccount.js'
import { deployContract } from '../actions/wallet/deployContract.js'
import { prepareTransactionRequest } from '../actions/wallet/prepareTransactionRequest.js'
import { sendTransaction } from '../actions/wallet/sendTransaction.js'
import { sendTransactionSync } from '../actions/wallet/sendTransactionSync.js'
import { signTransaction } from '../actions/wallet/signTransaction.js'
import { writeContract } from '../actions/wallet/writeContract.js'
import { writeContractSync } from '../actions/wallet/writeContractSync.js'
import { mainnet, tempoLocalnet } from '../chains/index.js'
import { createWalletClient } from '../clients/createWalletClient.js'
import { http } from '../clients/transports/http.js'
import { formatters } from './Formatters.js'
import type { TransactionRequest } from './Transaction.js'

const account = privateKeyToAccount(accounts[0].privateKey)
const abi = parseAbi(['function mint(uint256 tokenId)'])

describe('transactionRequest', () => {
  expectTypeOf(formatters.transactionRequest.format)
    .parameter(0)
    .toEqualTypeOf<TransactionRequest>()
})

describe('smoke', () => {
  test('transactionRequest (prepareTransactionRequest)', async () => {
    const client = createWalletClient({
      account,
      chain: tempoLocalnet,
      transport: http(),
    })
    const mainnetClient = createWalletClient({
      account,
      chain: mainnet,
      transport: http(),
    })

    prepareTransactionRequest(client, {
      feePayer: true,
    })

    prepareTransactionRequest(mainnetClient, {
      // @ts-expect-error `feePayer` is not defined
      feePayer: true,
    })
  })

  test('transactionRequest (chain on action)', async () => {
    const client = createWalletClient({
      account,
      transport: http(),
    })

    sendTransaction(client, {
      chain: tempoLocalnet,
      feePayer: true,
    })
    sendTransactionSync(client, {
      chain: tempoLocalnet,
      feePayer: true,
    })
    signTransaction(client, {
      chain: tempoLocalnet,
      feePayer: true,
    })
    writeContract(client, {
      chain: tempoLocalnet,
      address: '0x',
      abi,
      functionName: 'mint',
      args: [1n],
      feePayer: true,
    })
    writeContractSync(client, {
      chain: tempoLocalnet,
      address: '0x',
      abi,
      functionName: 'mint',
      args: [1n],
      feePayer: true,
    })
    deployContract(client, {
      chain: tempoLocalnet,
      abi: [],
      bytecode: '0x',
      feePayer: true,
    })
  })

  test('transactionRequest (wallet actions)', async () => {
    const client = createWalletClient({
      account,
      chain: tempoLocalnet,
      transport: http(),
    })

    sendTransaction(client, {
      feePayer: true,
    })
    sendTransactionSync(client, {
      feePayer: true,
    })
    signTransaction(client, {
      feePayer: true,
    })
    writeContract(client, {
      address: '0x',
      abi,
      functionName: 'mint',
      args: [1n],
      feePayer: true,
    })
    writeContractSync(client, {
      address: '0x',
      abi,
      functionName: 'mint',
      args: [1n],
      feePayer: true,
    })
    deployContract(client, {
      abi: [],
      bytecode: '0x',
      feePayer: true,
    })
  })
})
