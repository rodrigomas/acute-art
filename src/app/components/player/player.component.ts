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
  @Input() videoUrl: string = 'https://vimeo.com/520974949/279f38821e'

  @ViewChild('player_container') playerContainer: any

  public videoPlayer: Player | undefined
  options = {
    url: this.videoUrl,
    autoplay: true,
    controls: true,
    loop: true,
    responsive: true,
    title: true,
  }
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
