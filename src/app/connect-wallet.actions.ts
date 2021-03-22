import { AccountInfo } from '@airgap/beacon-sdk'
import { createAction, props } from '@ngrx/store'
import { Color } from './services/store/store.service'

const featureName = 'ConnectWallet'

export const setupBeacon = createAction(`[${featureName}] Setup Beacon`)
export const setupBeaconSuccess = createAction(
  `[${featureName}] Setup Beacon Success`
)
export const setupBeaconFailure = createAction(
  `[${featureName}] Setup Beacon Failure`,
  props<{ error: any }>()
)

export const connectWallet = createAction(`[${featureName}] Connect Wallet`)
export const connectWalletSuccess = createAction(
  `[${featureName}] Connect Wallet Success`,
  props<{ accountInfo: AccountInfo | undefined }>()
)
export const connectWalletFailure = createAction(
  `[${featureName}] Connect Wallet Failure`,
  props<{ error: any }>()
)

export const disconnectWallet = createAction(
  `[${featureName}] Disconnect Wallet`
)
export const disconnectWalletSuccess = createAction(
  `[${featureName}] Disconnect Wallet Success`
)
export const disconnectWalletFailure = createAction(
  `[${featureName}] Disconnect Wallet Failure`,
  props<{ error: any }>()
)
export const claimingReward = createAction(
  `[${featureName}] Claiming Reward`,
  props<{ color: Color | undefined }>()
)
export const claimingRewardSuccess = createAction(
  `[${featureName}] Claiming Reward Succeeded`,
  props<{ color: Color; operationHash: string }>()
)
export const claimingRewardFailure = createAction(
  `[${featureName}] Claiming Reward Failed`,
  props<{ error: any }>()
)
export const postingTransaction = createAction(
  `[${featureName}] Posting Transaction`,
  props<{ color: Color; operationHash: string }>()
)
export const postingTransactionSuccess = createAction(
  `[${featureName}] Posting Transaction Succeeded`
)
export const postingTransactionFailure = createAction(
  `[${featureName}] Posting Transaction Failed`,
  props<{ error: any }>()
)
