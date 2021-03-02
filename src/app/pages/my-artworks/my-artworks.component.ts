import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { StoreService, Color } from 'src/app/services/store/store.service'

@Component({
  selector: 'app-my-artworks',
  templateUrl: './my-artworks.component.html',
  styleUrls: ['./my-artworks.component.scss'],
})
export class MyArtworksComponent implements OnInit {
  public colors$: Observable<Color[]> = new Observable()
  public colorsCount$: Observable<number> = new Observable()

  constructor(private readonly storeService: StoreService) {
    this.storeService.setView('my-colors')
    this.storeService.setSortType('name')
    this.storeService.setSortDirection('asc')
    this.storeService.setSearchString('')
    this.colors$ = this.storeService.colors$
    this.colorsCount$ = this.storeService.colorsCount$
  }

  ngOnInit(): void {}
}
