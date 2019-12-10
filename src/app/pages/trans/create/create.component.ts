import { Component, OnInit } from '@angular/core';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router } from '@angular/router';
import { AdminsService } from 'app/shared/services/admins.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
trans={} as any
regularForm: FormGroup;
type = ['deposite', 'withdraw'];
  constructor(private helperTools: HelperToolsService,
    public router: Router, private adminController: AdminsService, private spinnerSrevice: NgxSpinnerService) { }

  ngOnInit() {
    this.regularForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
        ]),
        value: new FormControl(null, [
          Validators.required,
        ]),
        type: new FormControl(),    
      },
      { updateOn: "blur" }
    );
  }
  onSubmitClicked() {
    this.spinnerSrevice.show();
    console.log(this.trans)
    this.adminController.createtransData(this.trans).subscribe(data => {
      this.spinnerSrevice.hide();
      if (data['status'] == 'success') {
        this.helperTools.showAlertWithTranslation('Done', 'ProccessDoneSuccessfully', 'success');
        this.router.navigate(['/trans/show']);
      } else {
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      }
    }, err => {
      this.spinnerSrevice.hide();
      this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
    })
  }
}
