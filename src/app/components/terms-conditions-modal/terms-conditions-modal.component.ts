import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { CacheKeys } from 'src/app/services/cache.service'
import * as actions from '../../connect-wallet.actions'
import { Store } from '@ngrx/store'
import { State } from 'src/app/app.reducer'
import { OperationType } from '../artwork-card-item/artwork-card-item.component'

@Component({
  selector: 'app-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.scss'],
})
export class TermsConditionsModalComponent implements OnInit {
  public opType: OperationType = OperationType.UNDEFINED

  checkedControl: FormControl

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private readonly store$: Store<State>
  ) {
    this.checkedControl = new FormControl(null, Validators.required)
  }

  ngOnInit(): void {}

  submit() {
    this.store$.dispatch(
      actions.submittingTerms({
        key: CacheKeys.termsAgreed,
        value: this.checkedControl.value.toString(),
        operationType: this.opType,
      })
    )
    // this.cacheService.set(
    //   CacheKeys.termsAgreed,
    //   this.checkedControl.value.toString()
    // )
  }
}
