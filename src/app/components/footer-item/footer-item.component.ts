import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api/api.service'

@Component({
  selector: 'app-footer-item',
  templateUrl: './footer-item.component.html',
  styleUrls: ['./footer-item.component.scss'],
})
export class FooterItemComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {}

  testMailChimp() {
    this.apiService
      .testRequest()
      .subscribe((response) => console.log('mailchimp dummy: ', response))
  }
}
