import { Injectable } from '@angular/core'
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { of } from 'rxjs'
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  mergeMap,
  filter,
} from 'rxjs/operators'

import * as actions from './connect-wallet.actions'
import { ApiService } from './services/api/api.service'
import { BeaconService } from './services/beacon/beacon.service'

@Injectable()
export class ConnectWalletEffects {
  constructor(
    private actions$: Actions,
    private readonly beaconService: BeaconService,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService
  ) {}

  setupBeacon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setupBeacon),
      switchMap(() => {
        return this.beaconService
          .setupBeaconWallet()
          .then((accountInfo) => {
            if (accountInfo !== undefined) {
              return actions.connectWalletSuccess({ accountInfo })
            } else {
              return actions.setupBeaconSuccess()
            }
          })
          .catch((error) => actions.connectWalletFailure({ error }))
      })
    )
  )

  connectWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.connectWallet),
      switchMap(() => {
        return this.beaconService
          .requestPermission()
          .then((accountInfo) => actions.connectWalletSuccess({ accountInfo }))
          .catch((error) => actions.connectWalletFailure({ error }))
      })
    )
  )

  // connectWalletSucceeded$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.connectWalletSuccess),
  //     map(() => actions.loadBalance())
  //   )
  // )

  disconnectWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.disconnectWallet),
      switchMap(() => {
        return this.beaconService
          .reset()
          .then(() => actions.disconnectWalletSuccess())
          .catch((error) => actions.disconnectWalletFailure({ error }))
      })
    )
  )
  claimingReward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.claimingReward),
      switchMap(({ color }) => {
        if (color && !color.loading && color.auction) {
          console.log('Claiming done')
          return this.beaconService
            .claim(color.auction.auctionId, color.token_id)
            .then((response) =>
              actions.claimingRewardSuccess({
                color: color,
                operationHash: response.opHash,
              })
            )
            .catch((error) => actions.claimingRewardFailure({ error }))
        } else {
          console.log('Claiming already in progress')
          return of(
            actions.claimingRewardFailure({ error: 'no item was provided' })
          )
        }
      })
    )
  )
  claimingRewardSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.claimingRewardSuccess),
      map(({ color, operationHash }) => {
        return actions.postingTransaction({ color, operationHash })
      })
    )
  )
  postingTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.postingTransaction),
      switchMap(({ color, operationHash }) => {
        if (color && color.owner) {
          return this.apiService
            .postTransaction(
              color.name,
              operationHash,
              color.owner,
              color.token_id
            )
            .pipe(
              map((response) => actions.postingTransactionSuccess()),
              catchError((error) =>
                of(actions.postingTransactionFailure({ error }))
              )
            )
        } else {
          return of(
            actions.postingTransactionFailure({ error: 'no item provided' })
          )
        }
      })
    )
  )

  signUpMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.signUpMember),
      switchMap(({ email }) => {
        return this.apiService.addMember(email).pipe(
          map(() => actions.signUpMemberSuccess({ email })),
          catchError((error) => of(actions.signUpMemberFailed(error)))
        )
      })
    )
  )
  @Effect({ dispatch: false }) showToastrSuccess$ = this.actions$.pipe(
    ofType(actions.signUpMemberSuccess),
    map(({ email }) => {
      return this.toastrService.success('has been signed up', email)
    })
  )
  @Effect({ dispatch: false }) showToastrFailed$ = this.actions$.pipe(
    ofType(actions.signUpMemberFailed),
    map(({ error }) => {
      if (error.title === 'Member Exists') {
        return this.toastrService.info("you're already subscribed")
      } else {
        return this.toastrService.error('an error has occured', error.status)
      }
    })
  )
}
