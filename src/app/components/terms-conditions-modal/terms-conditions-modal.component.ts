import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { CacheKeys, CacheService } from 'src/app/services/cache.service'

@Component({
  selector: 'app-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.scss'],
})
export class TermsConditionsModalComponent implements OnInit {
  checkedControl: FormControl

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private readonly cacheService: CacheService
  ) {
    this.checkedControl = new FormControl(null, Validators.required)
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.checkedControl.value.toString())
    this.cacheService.set(
      CacheKeys.termsAgreed,
      this.checkedControl.value.toString()
    )
  }
}
