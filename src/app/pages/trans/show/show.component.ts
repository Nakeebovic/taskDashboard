import { Component, OnInit } from '@angular/core';
import { SharedData } from 'app/shared/sharedClass';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from 'app/shared/services/admins.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  trans = [] as any;
  filterData = { offset: 1  };
  transCount = 0;

  imageBaseURL = SharedData.IMAGE_BASE_URL;
  constructor(private helperTools: HelperToolsService,
    private controller: AdminsService, private spinerService: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.getAllquestion()
  }
  getAllquestion() {
    
    this.spinerService.show();
    console.log(this.filterData)
    this.controller.gettransData(this.filterData.offset - 1,'').subscribe(data => {
      console.log(this.trans);
      this.spinerService.hide();
      if (data['status'] == 'success') {
        this.trans= data['data']['rows'];
        this.transCount = data['data']['count'];
        console.log(this.transCount)
        console.log(this.trans)
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
      this.controller.removetransData(order.id).subscribe(data => {
        this.spinerService.hide();
        if (data['status'] == 'success') {
          this.trans = [] as any;
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
