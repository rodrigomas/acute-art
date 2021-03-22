import { Injectable } from '@angular/core'
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects'
import { BsModalService } from 'ngx-bootstrap/modal'
import { of } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  mergeMap,
  filter,
} from 'rxjs/operators'
import { OperationType } from './components/artwork-card-item/artwork-card-item.component'
import { TermsConditionsModalComponent } from './components/terms-conditions-modal/terms-conditions-modal.component'

import * as actions from './connect-wallet.actions'
import { ApiService } from './services/api/api.service'
import { BeaconService } from './services/beacon/beacon.service'
import { CacheKeys, CacheService } from './services/cache.service'
import BigNumber from 'bignumber.js'

@Injectable()
export class ConnectWalletEffects {
  constructor(
    private actions$: Actions,
    private readonly beaconService: BeaconService,
    private readonly cacheService: CacheService,
    private readonly modalService: BsModalService,
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
  checkingTermsAccepted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkingTermsAccepted),
      switchMap(({ operationType, color, bidAmount }) => {
        return of(this.cacheService.get(CacheKeys.termsAgreed)).pipe(
          map((response) => {
            if (response) {
              return actions.checkingTermsAcceptedSuccess({
                operationType,
                color,
                bidAmount,
              })
            } else {
              return actions.showTermsModal({ operationType, color, bidAmount })
            }
          }),
          catchError((error) =>
            of(actions.checkingTermsAcceptedFailure({ error }))
          )
        )
      })
    )
  )

  checkingTermsAcceptedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkingTermsAcceptedSuccess),
      map(({ operationType, color, bidAmount }) => {
        if (operationType === OperationType.BID) {
          return actions.bidOperation({ color, bidAmount })
        } else if (operationType === OperationType.INITIAL) {
          return actions.createInitialAcution({ color })
        } else {
          return actions.invalidOperation()
        }
      })
    )
  )

  @Effect({ dispatch: false }) showTermsModal$ = this.actions$.pipe(
    ofType(actions.showTermsModal),
    map(({ operationType, color, bidAmount }) => {
      let modalRef = this.modalService.show(TermsConditionsModalComponent, {
        class: 'modal-md modal-dialog-centered',
      })
      modalRef
        ? modalRef.content
          ? ((modalRef.content.opType = operationType),
            (modalRef.content.color = color),
            (modalRef.content.bidAmount = bidAmount))
          : null
        : null
    })
  )

  submittingTerms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.submittingTerms),
      map(({ key, value, operationType, color, bidAmount }) => {
        this.cacheService.set(key, value)

        return actions.checkingTermsAcceptedSuccess({
          operationType,
          color,
          bidAmount,
        })
      })
    )
  )

  bidOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.bidOperation),
      switchMap(async ({ color, bidAmount }) => {
        if (color && !color.loading && color.auction && bidAmount) {
          const amount = new BigNumber(bidAmount).shiftedBy(6).toString()
          return this.beaconService
            .bid(color.auction.auctionId, color.token_id, amount)
            .then(() => {
              return actions.bidOperationSuccess()
            })
            .catch((error) => actions.bidOperationFailure({ error }))
        } else {
          console.log('Bidding already in progress')
          return actions.bidOperationSuccess()
        }
      })
    )
  )
  createInitialAcution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createInitialAcution),
      switchMap(async ({ color }) => {
        if (color && !color.loading && color.auction) {
          return this.beaconService
            .createInitialAuction(color.token_id)
            .then(() => {
              return actions.createInitialAcutionSucess()
            })
            .catch((error) => actions.createInitialAcutionFailure({ error }))
        } else {
          console.log('Creating auction already in progress')
          return actions.createInitialAcutionSucess()
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
