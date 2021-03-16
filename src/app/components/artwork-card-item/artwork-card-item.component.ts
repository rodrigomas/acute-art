import { state } from '@angular/animations'
import { Component, OnInit, Input } from '@angular/core'
import { StorageMap } from '@ngx-pwa/local-storage'
import BigNumber from 'bignumber.js'

import { BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
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

type ColorState =
  | 'loading'
  | 'free'
  | 'auction'
  | 'unclaimed'
  | 'claim'
  | 'owned'
  | 'own'

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

  showTermsModal$: Observable<boolean>

  constructor(
    private readonly modalService: BsModalService,
    private readonly beaconService: BeaconService,
    private readonly storeService: StoreService,
    private readonly cacheService: CacheService
  ) {
    this.showTermsModal$ = this.cacheService.get(CacheKeys.termsAgreed)
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
      class: 'modal-xl modal-dialog-centered',
    })
  }

  toggleFavorite() {
    if (this.color) {
      this.storeService.setFavorite(this.color.token_id, !this.color.isFavorite)
    }
  }

  async bid() {
    this.showTermsModal$.subscribe((agreed) => {
      if (!agreed) {
        this.openTermsModal()
      }
    })
    if (
      this.color &&
      !this.color.loading &&
      this.color.auction &&
      this.bidAmount
    ) {
      const bidAmount = new BigNumber(this.bidAmount).shiftedBy(6).toString()
      await this.beaconService.bid(
        this.color.auction.auctionId,
        this.color.token_id,
        bidAmount
      )
      console.log('Bidding done')
    } else {
      console.log('Bidding already in progress')
    }
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
    if (this.color && !this.color.loading) {
      await this.beaconService.createInitialAuction(this.color.token_id)
      console.log('Creating auction done')
    } else {
      console.log('Creating auction already in progress')
    }
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
