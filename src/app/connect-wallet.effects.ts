import { Injectable } from '@angular/core'
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects'
import { BsModalService } from 'ngx-bootstrap/modal'
import { from, of } from 'rxjs'
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  mergeMap,
  filter,
} from 'rxjs/operators'
import { TermsConditionsModalComponent } from './components/terms-conditions-modal/terms-conditions-modal.component'

import * as actions from './connect-wallet.actions'
import { BeaconService } from './services/beacon/beacon.service'
import { CacheKeys, CacheService } from './services/cache.service'

@Injectable()
export class ConnectWalletEffects {
  constructor(
    private actions$: Actions,
    private readonly beaconService: BeaconService,
    private readonly cacheService: CacheService,
    private readonly modalService: BsModalService
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
      switchMap(({ operationType }) => {
        return of(this.cacheService.get(CacheKeys.termsAgreed)).pipe(
          map((response) => {
            if (response) {
              return actions.checkingTermsAcceptedSuccess({ operationType })
            } else {
              //TODO deploy action to show modal
              return actions.showTermsModal({ operationType })
            }
          }),
          catchError((error) =>
            of(actions.checkingTermsAcceptedFailure({ error }))
          )
        )
      })
    )
  )

  @Effect({ dispatch: false }) showTermsModal$ = this.actions$.pipe(
    ofType(actions.showTermsModal),
    map(({ operationType }) => {
      //TODO: show modal
      let modalRef = this.modalService.show(TermsConditionsModalComponent, {
        class: 'modal-md modal-dialog-centered',
      })
      modalRef
        ? modalRef.content
          ? (modalRef.content.opType = operationType)
          : null
        : null
    })
  )
  @Effect({ dispatch: false }) submittingTerms$ = this.actions$.pipe(
    ofType(actions.submittingTerms),
    map(({ key, value }) => {
      return this.cacheService.set(key, value)
    })
  )
}
