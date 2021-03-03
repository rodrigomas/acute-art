import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuctionsComponent } from './pages/auctions/auctions.component'
import { ExploreComponent } from './pages/explore/explore.component'
import { LandingComponent } from './pages/landing/landing.component'
import { MyArtworksComponent } from './pages/my-artworks/my-artworks.component'
import { WatchlistComponent } from './pages/watchlist/watchlist.component'

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'auctions', component: AuctionsComponent },
  { path: 'my-artworks', component: MyArtworksComponent },
  { path: 'watchlist', component: WatchlistComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
