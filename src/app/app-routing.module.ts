import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuctionsComponent } from './pages/auctions/auctions.component'
import { CollectComponent } from './pages/collect/collect.component'
import { MyArtworksComponent } from './pages/my-artworks/my-artworks.component'
import { WatchlistComponent } from './pages/watchlist/watchlist.component'

const routes: Routes = [
  { path: '', component: CollectComponent },
  { path: 'auctions', component: AuctionsComponent },
  { path: 'my-artworks', component: MyArtworksComponent },
  { path: 'watchlist', component: WatchlistComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
