import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminsService } from 'app/shared/services/admins.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  trans = {} as any;
  type = ['deposite', 'withdraw'];
  regularForm: FormGroup;
  constructor(private helperTools: HelperToolsService,
    public router: Router, private adminController: AdminsService, private spinnerSrevice: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.regularForm = new FormGroup(
      {
        question: new FormControl(null, [
          Validators.required,
        ]),
        answer: new FormControl(null, [
          Validators.required,
        ]),

      },
      { updateOn: "blur" }
    );
    this.route.params.subscribe(data => {
      if (data['id']) {
        this.getQuestionById(data['id']);
      }
    })
  }
  getQuestionById(id) {
    this.spinnerSrevice.show();
    this.adminController.gettransData('', id).subscribe(data => {
      this.spinnerSrevice.hide();
      if (data['status'] == 'success') {
        this.trans = data['data'];
      } else {
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      }
    }, err => {
      this.spinnerSrevice.hide();
      this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
    })
  }
  onSubmitClicked() {
    this.spinnerSrevice.show();
    console.log(this.trans)
    this.adminController.updatetransData(this.trans).subscribe(data => {
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

