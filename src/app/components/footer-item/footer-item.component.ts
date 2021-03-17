import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api/api.service'

const addressValidatorOrOpts = [Validators.required, Validators.email]

@Component({
  selector: 'app-footer-item',
  templateUrl: './footer-item.component.html',
  styleUrls: ['./footer-item.component.scss'],
})
export class FooterItemComponent implements OnInit {
  public emailAddressControl: FormControl
  constructor(private readonly apiService: ApiService) {
    this.emailAddressControl = new FormControl('', addressValidatorOrOpts)
  }

  ngOnInit(): void {}

  getMembers() {
    this.apiService
      .getMembers()
      .subscribe((response) => console.log('Members response: ', response))
  }
  addMember() {
    this.apiService
      .addMember(this.emailAddressControl.value)
      .subscribe((response) => console.log('email response: ', response))
  }
}
