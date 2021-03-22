import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Color } from 'src/app/services/store/store.service'
import { environment } from 'src/environments/environment'
import { ColorState } from '../artwork-card-item/artwork-card-item.component'

export interface Result {
  consumed_gas: number
  storage_size: number
  paid_storage_size_diff?: number
}

export interface Child4 {
  prim: string
  type: string
  name: string
  value: string
}

export interface Child3 {
  prim: string
  type: string
  children: Child4[]
}

export interface Child2 {
  prim: string
  type: string
  value: string
  name: string
  children: Child3[]
}

export interface Child {
  prim: string
  type: string
  name: string
  value: string
  children: Child2[]
}

export interface Parameters {
  prim: string
  type: string
  value: string
  children: Child[]
  name: string
}

export interface Child6 {
  prim: string
  type: string
  name: string
  value: any
  from: string
  diff_type: string
}

export interface Child5 {
  prim: string
  type: string
  name: string
  children: Child6[]
  value: any
  diff_type: string
}

export interface StorageDiff {
  prim: string
  type: string
  children: Child5[]
}

export interface HistoryItem {
  level: number
  fee: number
  counter: number
  gas_limit: number
  amount: number
  content_index: number
  result: Result
  parameters: Parameters
  storage_diff: StorageDiff
  timestamp: Date
  id: string
  protocol: string
  hash: string
  network: string
  kind: string
  source: string
  destination: string
  status: string
  entrypoint: string
  internal: boolean
  mempool: boolean
  storage_limit?: number
  burned?: number
}

@Component({
  selector: 'app-auction-modal',
  templateUrl: './artwork-history-modal.component.html',
  styleUrls: ['./artwork-history-modal.component.scss'],
})
export class ArtworkHistoryModalComponent implements OnInit {
  color: Color | undefined

  itemState: ColorState = 'loading'

  history: HistoryItem[] | undefined

  public videoExampleUrl = 'https://vimeo.com/520974949/279f38821e' //TODO change to dynamic attribute

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getHistory()
  }

  openAddress(address: string) {
    window.open(`https://tezblock.io/account/${address}`, '_blank')
  }

  public async getHistory() {
    if (this.color && this.color.auction) {
      this.history = await this.http
        .get<HistoryItem[]>(
          `${environment.indexerUrl}auction/operations?entrypoint=bid&parameters.value=${this.color.auction.auctionId}`
        )
        .toPromise()
    }
  }
}
