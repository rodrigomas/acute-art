import { AccountInfo } from '@airgap/beacon-sdk'
import { createAction, props } from '@ngrx/store'
import { OperationType } from './components/artwork-card-item/artwork-card-item.component'
import { CacheKeys } from './services/cache.service'
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
export const checkingTermsAccepted = createAction(
  `[${featureName}] Checking if Terms & Conditions Accepted`,
  props<{
    operationType: OperationType
    color: Color | undefined
    bidAmount: string | undefined
  }>()
)
export const checkingTermsAcceptedSuccess = createAction(
  `[${featureName}] Checking if Terms & Conditions Accepted Success`,
  props<{
    operationType: OperationType
    color: Color | undefined
    bidAmount: string | undefined
  }>()
)
export const checkingTermsAcceptedFailure = createAction(
  `[${featureName}] Checking if Terms & Conditions Accepted Failure`,
  props<{ error: any }>()
)
export const showTermsModal = createAction(
  `[${featureName}] Showing Terms & Conditions Modal`,
  props<{
    operationType: OperationType
    color: Color | undefined
    bidAmount: string | undefined
  }>()
)
export const submittingTerms = createAction(
  `[${featureName}] Submitting Terms & Conditions Modal`,
  props<{
    key: CacheKeys
    value: string
    operationType: OperationType
    color: Color | undefined
    bidAmount: string | undefined
  }>()
)
export const bidOperation = createAction(
  `[${featureName}] Starting Bid Operation`,
  props<{
    color: Color | undefined
    bidAmount: string | undefined
  }>()
)
export const bidOperationSuccess = createAction(
  `[${featureName}] Bid Operation Succeeded`
)
export const bidOperationFailure = createAction(
  `[${featureName}] Bid Operation Failed`,
  props<{ error: any }>()
)
export const createInitialAcution = createAction(
  `[${featureName}] Creating Initial Auction`,
  props<{
    color: Color | undefined
  }>()
)
export const createInitialAcutionSucess = createAction(
  `[${featureName}] Creating Initial Auction Succeeded`
)
export const createInitialAcutionFailure = createAction(
  `[${featureName}] Creating Initial Auction Failed`,
  props<{ error: any }>()
)
export const invalidOperation = createAction(
  `[${featureName}] Invalid Operation Type Submitted`
)
export const signUpMember = createAction(
  `[${featureName}] Signing Up Member To Newsletter`,
  props<{ email: string }>()
)
export const signUpMemberSuccess = createAction(
  `[${featureName}] Signing Up Member To Newsletter Success`,
  props<{ email: string }>()
)
export const signUpMemberFailed = createAction(
  `[${featureName}] Signing Up Member To Newsletter Failed`,
  props<{ error: any }>()
)
