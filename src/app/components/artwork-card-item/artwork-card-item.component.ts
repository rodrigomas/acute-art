import { Component, OnInit, Input } from '@angular/core'
import BigNumber from 'bignumber.js'

import { BsModalService } from 'ngx-bootstrap/modal'
import { first } from 'rxjs/operators'
import { AuctionModalComponent } from 'src/app/components/auction-modal/auction-modal.component'
import { BeaconService } from 'src/app/services/beacon/beacon.service'
import { CacheKeys, CacheService } from 'src/app/services/cache.service'
import {
  Color,
  isActiveAuction,
  isClaimable,
  isOwner,
  StoreService,
} from 'src/app/services/store/store.service'
import { ArtworkHistoryModalComponent } from '../artwork-history-modal/artwork-history-modal.component'
import { TermsConditionsModalComponent } from '../terms-conditions-modal/terms-conditions-modal.component'
import { Store } from '@ngrx/store'
import * as actions from '../../connect-wallet.actions'
import { State } from 'src/app/app.reducer'

type ColorState =
  | 'loading'
  | 'free'
  | 'auction'
  | 'unclaimed'
  | 'claim'
  | 'owned'
  | 'own'

export enum OperationType {
  BID = 'bid',
  INITIAL = 'initial',
  UNDEFINED = 'undefined',
}
@Component({
  selector: 'app-artwork-card-item',
  templateUrl: './artwork-card-item.component.html',
  styleUrls: ['./artwork-card-item.component.scss'],
})
export class ArtworkCardItemComponent implements OnInit {
  @Input()
  color: Color | undefined

  @Input()
  isOwned: boolean = false

  @Input()
  isAuction: boolean = false

  @Input()
  isModal: boolean = false

  ownAddress: string | undefined

  bidAmount: string | undefined
  minBidAmount: string | undefined

  isOver: boolean = false

  state: ColorState = 'loading'

  showTermsModal: string | null

  constructor(
    private readonly modalService: BsModalService,
    private readonly beaconService: BeaconService,
    private readonly storeService: StoreService,
    private readonly cacheService: CacheService,
    private readonly store$: Store<State>
  ) {
    this.showTermsModal = this.cacheService.get(CacheKeys.termsAgreed)
    this.cacheService.delete(CacheKeys.termsAgreed)
  }

  ngOnInit(): void {
    if (this.color && this.color.auction) {
      this.bidAmount = new BigNumber(this.color.auction.bidAmount)
        .plus(100_000)
        .shiftedBy(-6)
        .toString()

      this.minBidAmount = this.bidAmount
    }

    this.updateCardState()
  }

  openAddress(address: string) {
    window.open(`https://tezblock.io/account/${address}`, '_blank')
  }

  openAuctionModal() {
    if (!this.color) {
      return
    }
    const modalRef = this.modalService.show(AuctionModalComponent, {
      initialState: {
        color: this.color,
      },
      class: 'modal-xl modal-dialog-centered',
    })
  }

  openHistoryModal() {
    if (!this.color) {
      return
    }
    const modalRef = this.modalService.show(ArtworkHistoryModalComponent, {
      initialState: {
        color: this.color,
      },
      class: 'modal-xl modal-dialog-centered',
    })
  }

  openTermsModal() {
    const modalRef = this.modalService.show(TermsConditionsModalComponent, {
      class: 'modal-md modal-dialog-centered',
    })
  }

  toggleFavorite() {
    if (this.color) {
      this.storeService.setFavorite(this.color.token_id, !this.color.isFavorite)
    }
  }

  async bid() {
    this.store$.dispatch(
      actions.checkingTermsAccepted({
        operationType: OperationType.BID,
        color: this.color,
        bidAmount: this.bidAmount,
      })
    )
  }

  async claim() {
    if (this.color && !this.color.loading && this.color.auction) {
      await this.beaconService.claim(
        this.color.auction.auctionId,
        this.color.token_id
      )
      console.log('Claiming done')
    } else {
      console.log('Claiming already in progress')
    }
  }

  async createInitialAuction() {
    this.store$.dispatch(
      actions.checkingTermsAccepted({
        operationType: OperationType.INITIAL,
        color: this.color,
        bidAmount: undefined,
      })
    )
  }

  auctionOverEvent() {
    this.updateCardState()
  }

  private updateCardState() {
    this.storeService.accountInfo$.pipe(first()).subscribe((accountInfo) => {
      this.ownAddress = accountInfo?.address
      if (this.color) {
        this.state = 'free'
        if (this.color.owner) {
          this.state = 'owned'
          if (this.color.auction) {
            this.state = 'unclaimed'
          }
        }
        if (isOwner(this.color, accountInfo)) {
          this.state = 'own'
        }
        if (isActiveAuction(this.color)) {
          this.state = 'auction'
        }
        if (isClaimable(this.color, accountInfo)) {
          this.state = 'claim'
        }
      }
    })
  }
}
