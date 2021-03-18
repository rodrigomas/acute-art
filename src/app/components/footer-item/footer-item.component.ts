import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api/api.service'
import * as fromRoot from '../../reducers/index'
import * as actions from '../../connect-wallet.actions'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

const addressValidatorOrOpts = [Validators.required, Validators.email]

@Component({
  selector: 'app-footer-item',
  templateUrl: './footer-item.component.html',
  styleUrls: ['./footer-item.component.scss'],
})
export class FooterItemComponent implements OnInit {
  public emailAddressControl: FormControl
  public validAddress: boolean | undefined

  model: string = ''
  modelChanged: Subject<string> = new Subject<string>()

  constructor(
    private readonly apiService: ApiService,
    private readonly store$: Store<fromRoot.State>
  ) {
    this.emailAddressControl = new FormControl('')

    this.modelChanged
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((model) => {
        this.emailAddressControl = new FormControl(
          model,
          model !== null ? addressValidatorOrOpts : null
        )
      })
  }

  ngOnInit(): void {}

  getMembers() {
    this.apiService
      .getMembers()
      .subscribe((response) => console.log('Members response: ', response))
  }
  addMember() {
    this.store$.dispatch(
      actions.signUpMember({ email: this.emailAddressControl.value })
    )
    this.emailAddressControl.reset()
    this.emailAddressControl = new FormControl('')
  }
  changed(text: string) {
    this.modelChanged.next(text)
  }
  ngOnDestroy() {}
}
