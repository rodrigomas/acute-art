import { AccountInfo } from '@airgap/beacon-sdk'
import { createAction, props } from '@ngrx/store'
import { OperationType } from './components/artwork-card-item/artwork-card-item.component'
import { CacheKeys } from './services/cache.service'

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
export const checkingTermsAccepted = createAction(
  `[${featureName}] Checking if Terms & Conditions Accepted`,
  props<{ operationType: OperationType }>()
)
export const checkingTermsAcceptedSuccess = createAction(
  `[${featureName}] Checking if Terms & Conditions Accepted Success`,
  props<{ operationType: OperationType }>()
)
export const checkingTermsAcceptedFailure = createAction(
  `[${featureName}] Checking if Terms & Conditions Accepted Failure`,
  props<{ error: any }>()
)
export const showTermsModal = createAction(
  `[${featureName}] Showing Terms & Conditions Modal`,
  props<{ operationType: OperationType }>()
)
export const submittingTerms = createAction(
  `[${featureName}] Submitting Terms & Conditions Modal`,
  props<{ key: CacheKeys; value: string; operationType: OperationType }>()
)
