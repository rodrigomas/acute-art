import { AccountInfo } from '@airgap/beacon-sdk'
import { createAction, props } from '@ngrx/store'

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
export const signUpMember = createAction(
  `[${featureName}] Signing Up Member To Newsletter`,
  props<{ email: string }>()
)
export const signUpMemberSuccess = createAction(
  `[${featureName}] Signing Up Member To Newsletter Success`
)
export const signUpMemberFailed = createAction(
  `[${featureName}] Signing Up Member To Newsletter Failed`,
  props<{ error: any }>()
)
