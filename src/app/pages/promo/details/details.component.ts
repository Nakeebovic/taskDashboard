import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminsService } from 'app/shared/services/admins.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CouponService } from 'app/shared/services/coupon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  promo = {} as any;
  type = ['deposite', 'withdraw'];
  regularForm: FormGroup;
  constructor(private helperTools: HelperToolsService,
    public router: Router, private Controller: CouponService, private spinnerSrevice: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.regularForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
        ]),
        description: new FormControl(null, [
          Validators.required,
        ]),
        info: new FormControl(null, [
          Validators.required,
        ]),

      },
      { updateOn: "blur" }
    );
    this.route.params.subscribe(data => {
      if (data['id']) {
        this.getPromoById(data['id']);
      }
    })
  }
  getPromoById(id) {
    this.spinnerSrevice.show();
    this.Controller.getpromoById(id).subscribe(data => {
      this.spinnerSrevice.hide();
      if (data['status'] == 'success') {
        this.promo = data['data'];
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
    console.log(this.promo)
    this.Controller.editpromo(this.promo).subscribe(data => {
      this.spinnerSrevice.hide();
      if (data['status'] == 'success') {
        this.helperTools.showAlertWithTranslation('Done', 'ProccessDoneSuccessfully', 'success');
        this.router.navigate(['/promo/show']);
      } else {
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      }
    }, err => {
      this.spinnerSrevice.hide();
      this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
    })
  }
}

