import { AccountInfo } from '@airgap/beacon-sdk'
import { Action, createReducer, on } from '@ngrx/store'

import * as actions from './connect-wallet.actions'
import { Color } from './services/store/store.service'

const colors = require('../assets/artworks.json')

export const appFeatureKey = 'app'

export interface Busy {
  connectedWallet: boolean
}

export interface State {
  connectedWallet: AccountInfo | undefined
  colors: Color[]
  busy: Busy
}

export const initialState: State = {
  connectedWallet: undefined,
  colors: colors.map((color: Color) => {
    return color
  }),
  busy: {
    connectedWallet: false,
  },
}

export const reducer = createReducer(
  initialState,
  on(actions.connectWallet, (state) => ({
    ...state,
    busy: {
      ...state.busy,
      connectedWallet: true,
    },
  })),
  on(actions.connectWalletSuccess, (state, { accountInfo }) => ({
    ...state,
    connectedWallet: accountInfo,
    busy: {
      ...state.busy,
      connectedWallet: false,
    },
  })),
  on(actions.connectWalletFailure, (state) => ({
    ...state,
    busy: {
      ...state.busy,
      connectedWallet: false,
    },
  })),
  on(actions.disconnectWallet, (state) => ({
    ...state,
    busy: {
      ...state.busy,
      connectedWallet: true,
    },
  })),
  on(actions.disconnectWalletSuccess, (state) => ({
    ...state,
    connectedWallet: undefined,
    busy: {
      ...state.busy,
      connectedWallet: false,
    },
  })),
  on(actions.disconnectWalletFailure, (state) => ({
    ...state,
    busy: {
      ...state.busy,
      connectedWallet: false,
    },
  }))
)
