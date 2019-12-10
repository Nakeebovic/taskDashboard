import { Component, OnInit } from '@angular/core';
import { SharedData } from 'app/shared/sharedClass';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from 'app/shared/services/admins.service';
import { CouponService } from 'app/shared/services/coupon.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  promo = [] as any;
  filterData = { offset: 1  };
  promoCount = 0;

  imageBaseURL = SharedData.IMAGE_BASE_URL;
  constructor(private helperTools: HelperToolsService,
    private controller: CouponService, private spinerService: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.getAllquestion()
  }
  getAllquestion() {
    
    this.spinerService.show();
    console.log(this.filterData)
    this.controller.getAllpromo(this.filterData.offset - 1).subscribe(data => {
      console.log(this.promo);
      this.spinerService.hide();
      if (data['status'] == 'success') {
        this.promo= data['data']['rows'];
        this.promoCount = data['data']['count'];
        console.log(this.promoCount)
        console.log(this.promo)
      } else {
        this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappened", "error");
      }
    }, err => {
      console.log(err);
      this.spinerService.hide();
      this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
    })
  }
 
  onDeleteUserClicked(order) {
    this.helperTools.showConfirmAlert('AreYouSure', 'WantToDelete').then(__ => {
      this.spinerService.show();
      this.controller.removepromo(order.id).subscribe(data => {
        this.spinerService.hide();
        if (data['status'] == 'success') {
          this.promo = [] as any;
          this.filterData.offset = 1;
          this.getAllquestion();
        } else {
          this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
        }
      }, err => {
        this.spinerService.hide();
        this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
      })
    }).catch(er => {

    })
  }
  onLoadMore(offset) {
    this.filterData.offset = offset;
    this.getAllquestion();
  }

}
