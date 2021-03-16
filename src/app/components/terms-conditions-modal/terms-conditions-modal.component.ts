import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.scss'],
})
export class TermsConditionsModalComponent implements OnInit {
  checkedControl: FormControl

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService
  ) {
    this.checkedControl = new FormControl(null, Validators.required)
  }

  ngOnInit(): void {}

  submit() {
    console.log('submitting')
    console.log(this.checkedControl.value)
  }

  onChange(isChecked: any) {
    console.log('ischecked: ', isChecked.target.checked)
    console.log('formcontrol value: ', this.checkedControl.value)
  }
}
