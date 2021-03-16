import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import Player from '@vimeo/player'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements AfterViewInit, OnInit {
  public options = {}

  @Input()
  set videoUrl(value: string) {
    if (value) {
      this.options = {
        url: value,
        autoplay: true,
        controls: false,
        loop: true,
        responsive: true,
        title: true,
      }
    }
  }

  @ViewChild('player_container') playerContainer: any

  public videoPlayer: Player | undefined

  constructor() {}

  ngAfterViewInit(): void {
    console.log('after view init')
    this.videoPlayer = new Player(
      this.playerContainer.nativeElement,
      this.options
    )
  }

  ngOnInit() {}
}
