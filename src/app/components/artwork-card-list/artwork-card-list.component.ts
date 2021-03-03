import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  Color,
  ColorCategory,
  SortDirection,
  SortTypes,
  StoreService,
  ViewTypes,
} from 'src/app/services/store/store.service'

@Component({
  selector: 'artwork-color-card-list',
  templateUrl: './artwork-card-list.component.html',
  styleUrls: ['./artwork-card-list.component.scss'],
})
export class ArtworkCardListComponent implements OnInit {
  @Input()
  public colors$: Observable<Color[]> = new Observable()

  @Input()
  public title: string = 'Colors'

  @Input()
  public emptyText: string = 'There is nothing here yet!'

  @Input()
  public count$: Observable<number> = new Observable()

  public view$: Observable<ViewTypes> | undefined

  searchString: string = ''

  itemsPerPage: number = 24
  numberOfItems: number = 12

  showMoreButton: Observable<boolean> = new BehaviorSubject<boolean>(
    true
  ).asObservable()

  sortType$: Observable<SortTypes>
  sortDirection$: Observable<SortDirection>
  category$: Observable<ColorCategory>

  loading$: Observable<boolean>

  constructor(private readonly storeService: StoreService) {
    this.storeService.setNumberOfItems(this.numberOfItems)
    this.sortType$ = this.storeService.sortType$
    this.sortDirection$ = this.storeService.sortDirection$
    this.category$ = this.storeService.category$
    this.view$ = this.storeService.view$
    this.loading$ = this.storeService.loading$
  }

  ngOnInit(): void {
    this.showMoreButton = this.count$.pipe(
      map((count) => count > this.numberOfItems)
    )
  }

  setCategory(oldCategory: ColorCategory, category: ColorCategory): void {
    if (oldCategory === category) {
      this.storeService.setCategory('all')
    } else {
      this.storeService.setCategory(category)
    }
  }

  sortType(type: SortTypes) {
    this.storeService.setSortType(type)
  }
  sortDirection(oldDirection: SortDirection, newDirection: SortDirection) {
    if (oldDirection === 'asc') {
      this.storeService.setSortDirection('desc')
    } else {
      this.storeService.setSortDirection('asc')
    }
  }

  clearFilters(): void {
    this.searchString = ''
    this.storeService.setSearchString(this.searchString)
    this.storeService.resetFilters()
  }

  textInput(_ev: any) {
    setTimeout(() => {
      this.storeService.setSearchString(this.searchString)
    }, 0)
  }

  showMoreItems() {
    this.numberOfItems += this.itemsPerPage
    this.storeService.setNumberOfItems(this.numberOfItems)
    this.showMoreButton = this.count$.pipe(
      map((count) => count > this.numberOfItems)
    ) // TODO: Remove this workaround and use "numberOfItems" observable from service
  }
}
